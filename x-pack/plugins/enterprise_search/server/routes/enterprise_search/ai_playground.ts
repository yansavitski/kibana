/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { registerAIPlaygroundRoutes as registerRoutes } from '@kbn/ai-playground/server/routes';

import { RouteDependencies } from '../../plugin';
import { elasticsearchErrorHandler } from '../../utils/elasticsearch_error_handler';

export function registerAIPlaygroundRoutes({ log, router, config }: RouteDependencies) {
  if (!config.showAIPlayground) {
    return;
  }

  registerRoutes({ log, router }, '/internal/enterprise_search', elasticsearchErrorHandler);
}
