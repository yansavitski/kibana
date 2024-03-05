/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema } from '@kbn/config-schema';
import { fetchFields } from '../lib/fetch_query_source_fields';
import Assist, { ConversationalChain, Prompt } from '@elastic/ai-assist';
import { ChatOpenAI } from '@elastic/ai-assist/models';
import { streamFactory } from '@kbn/ml-response-stream/server';
import { Logger } from '@kbn/logging';
import { IRouter, RequestHandler } from '@kbn/core/server';

export function registerAIPlaygroundRoutes(
  { log, router }: { log: Logger; router: IRouter },
  paths: { querySourceFields: string; chat: string; apiKey: string },
  errorHandler: <ContextType, RequestType, ResponseType>(
    log: Logger,
    requestHandler: RequestHandler<ContextType, RequestType, ResponseType>
  ) => RequestHandler<ContextType, RequestType, ResponseType>
) {
  router.post(
    {
      path: paths.querySourceFields,
      validate: {
        body: schema.object({
          indices: schema.arrayOf(schema.string()),
        }),
      },
    },
    errorHandler(log, async (context, request, response) => {
      const { client } = (await context.core).elasticsearch;

      const { indices } = request.body;

      const fields = await fetchFields(client, indices);

      return response.ok({
        body: fields,
      });
    })
  );

  router.post(
    {
      path: paths.chat,
      validate: {
        body: schema.object({
          data: schema.any(),
          messages: schema.any(),
        }),
      },
    },
    errorHandler(log, async (context, request, response) => {
      const { client } = (await context.core).elasticsearch;

      const aiClient = Assist({
        es_client: client.asCurrentUser,
      });

      const { messages, data } = await request.body;

      const model = new ChatOpenAI({
        openAIApiKey: data.api_key,
      });

      const chain = ConversationalChain({
        model,
        rag: {
          index: data.indices,
          retriever: (question: string) => {
            try {
              const query = JSON.parse(data.elasticsearchQuery.replace(/{query}/g, question));
              return query.query;
            } catch (e) {
              log.error('Failed to parse the Elasticsearch query', e);
            }
          },
        },
        prompt: Prompt(data.prompt, {
          citations: data.citations,
          context: true,
          type: 'openai',
        }),
      });

      const stream = await chain.stream(aiClient, messages);

      const { end, push, responseWithHeaders } = streamFactory(request.headers, log);

      const reader = (stream as ReadableStream).getReader();
      const textDecoder = new TextDecoder();

      async function pushStreamUpdate() {
        reader.read().then(({ done, value }: { done: boolean; value?: Uint8Array }) => {
          if (done) {
            end();
            return;
          }
          push(textDecoder.decode(value));
          pushStreamUpdate();
        });
      }

      pushStreamUpdate();

      return response.ok(responseWithHeaders);
    })
  );

  router.post(
    {
      path: paths.apiKey,
      validate: {
        body: schema.object({
          name: schema.string(),
          expiresInDays: schema.number(),
          indices: schema.arrayOf(schema.string()),
        }),
      },
    },
    errorHandler(log, async (context, request, response) => {
      const { name, expiresInDays, indices } = request.body;
      const { client } = (await context.core).elasticsearch;

      const apiKey = await client.asCurrentUser.security.createApiKey({
        name,
        expiration: `${expiresInDays}d`,
        role_descriptors: {
          [`aiPlayground-${name}-role`]: {
            cluster: [],
            indices: [
              {
                names: indices,
                privileges: ['read'],
              },
            ],
          },
        },
      });

      return response.ok({
        body: { apiKey },
        headers: { 'content-type': 'application/json' },
      });
    })
  );
}
