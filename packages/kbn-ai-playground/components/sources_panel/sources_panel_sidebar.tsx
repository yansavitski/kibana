/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { EuiCallOut, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { IndicesList } from './indices_list';
import { AddIndicesField } from './add_indices_field';
import { IndexName } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';

interface SourcesPanelSidebarProps {
  selectedIndices: IndexName[];
  addIndex: (newIndex: IndexName) => void;
  removeIndex: (index: IndexName) => void;
}

export const SourcesPanelSidebar: React.FC<SourcesPanelSidebarProps> = ({
  selectedIndices,
  addIndex,
  removeIndex,
}) => (
  <EuiFlexGroup direction="column">
    <EuiFlexItem>
      <EuiCallOut
        title={i18n.translate('aiPlayground.sources.callout', {
          defaultMessage: 'Changes here will reset your custom query',
        })}
        iconType="warning"
        size="s"
      />
    </EuiFlexItem>

    <EuiFlexItem>
      <IndicesList indices={selectedIndices} onRemoveClick={removeIndex} hasBorder />
    </EuiFlexItem>

    <EuiFlexItem>
      <AddIndicesField selectedIndices={selectedIndices} onIndexSelect={addIndex} />
    </EuiFlexItem>
  </EuiFlexGroup>
);
