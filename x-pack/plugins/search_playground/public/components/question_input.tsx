/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { css } from '@emotion/react';

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  button: React.ReactNode;
  isDisabled?: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  value,
  onChange,
  button,
  isDisabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <EuiFlexGroup alignItems="center" justifyContent="spaceBetween" css={{ position: 'relative' }}>
      <input
        className="euiFieldText euiFieldText--fullWidth"
        style={{
          padding: '20px 76px 20px 20px',
          height: '56px',
        }}
        placeholder={i18n.translate(
          'xpack.searchPlayground.chat.questionInput.askQuestionPlaceholder',
          {
            defaultMessage: 'Ask a question',
          }
        )}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
      />

      <EuiFlexItem
        grow={false}
        css={css`
          position: absolute;
          right: 16px;
        `}
      >
        {button}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
