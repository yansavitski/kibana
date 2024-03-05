/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { EuiLink } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { useFormContext } from 'react-hook-form';
import { OpenAIKeyField } from './open_ai_key_field';
import { StartChatPanel } from '../start_chat_panel';
import { ChatFormFields } from '../../types';

const openAIApiKeyLink = 'https://platform.openai.com/api-keys';

export const SummarizationPanelForStartChat: React.FC = () => {
  const { watch } = useFormContext();

  return (
    <StartChatPanel
      title={i18n.translate('aiPlayground.emptyPrompts.summarization.title', {
        defaultMessage: 'Enable summarization models',
      })}
      description={
        <FormattedMessage
          id="aiPlayground.emptyPrompts.summarization.description"
          defaultMessage="The AI Playground uses OpenAl models for summarization. Find or create your api key in OpenAI’s {link}"
          values={{
            link: (
              <EuiLink href={openAIApiKeyLink} target="_blank" external>
                <FormattedMessage
                  id="aiPlayground.emptyPrompts.summarization.description.linkText"
                  defaultMessage="API keys dashboard"
                />
              </EuiLink>
            ),
          }}
        />
      }
      isValid={watch(ChatFormFields.openAIKey)}
    >
      <OpenAIKeyField />
    </StartChatPanel>
  );
};
