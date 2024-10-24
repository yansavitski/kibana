/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FC } from 'react';

import type { DataView } from '@kbn/data-views-plugin/public';
import type {
  DataFrameAnalyticsConfig,
  DataFrameTaskStateType,
} from '@kbn/ml-data-frame-analytics-utils';

import { getToastNotifications } from '../../../../../util/dependency_cache';
import { useMlKibana } from '../../../../../contexts/kibana';

import { ResultsSearchQuery } from '../../../../common/analytics';

import { ExpandableSectionResults } from '../expandable_section';

import { useExplorationResults } from './use_exploration_results';

interface Props {
  dataView: DataView;
  jobConfig: DataFrameAnalyticsConfig;
  jobStatus?: DataFrameTaskStateType;
  needsDestDataView: boolean;
  searchQuery: ResultsSearchQuery;
}

export const ExplorationResultsTable: FC<Props> = React.memo(
  ({ dataView, jobConfig, needsDestDataView, searchQuery }) => {
    const {
      services: {
        mlServices: { mlApiServices },
      },
    } = useMlKibana();

    const classificationData = useExplorationResults(
      dataView,
      jobConfig,
      searchQuery,
      getToastNotifications(),
      mlApiServices
    );

    if (jobConfig === undefined || classificationData === undefined) {
      return null;
    }

    return (
      <div data-test-subj="mlDFAnalyticsExplorationTablePanel">
        <ExpandableSectionResults
          indexData={classificationData}
          dataView={dataView}
          resultsField={jobConfig?.dest.results_field}
          jobConfig={jobConfig}
          needsDestDataView={needsDestDataView}
          searchQuery={searchQuery}
        />
      </div>
    );
  }
);
