/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFormRow, EuiSuperSelect } from '@elastic/eui';
import React from 'react';
import { i18n } from '@kbn/i18n';

interface AddIndicesFieldProps {
  indices: string[];
  selectedIndices: string[];
  addIndex: (index: string) => void;
}

export const AddIndicesField: React.FC<AddIndicesFieldProps> = ({
  selectedIndices,
  indices,
  addIndex,
}) => {
  const onChange = (selectedIndex: string) => {
    addIndex(selectedIndex);
  };

  return (
    <EuiFormRow
      fullWidth
      label={i18n.translate('aiPlayground.sources.addIndex.label', {
        defaultMessage: 'Add index',
      })}
      labelType="legend"
    >
      <EuiSuperSelect
        placeholder={i18n.translate('aiPlayground.sources.addIndex.placeholder', {
          defaultMessage: 'Add new data source',
        })}
        fullWidth
        options={indices.map((index) => ({
          value: index,
          inputDisplay: index,
          disabled: selectedIndices.includes(index),
        }))}
        onChange={onChange}
        hasDividers
      />
    </EuiFormRow>
  );
};
