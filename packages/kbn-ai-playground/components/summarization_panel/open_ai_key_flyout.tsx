/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiFormRow,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React, { useState } from 'react';

export interface OpenAIKeyFlyOutProps {
  openAPIKey: string;
  onClose: () => void;
  onSave: (key: string) => void;
}

export const OpenAIKeyFlyOut: React.FC<OpenAIKeyFlyOutProps> = ({
  openAPIKey,
  onClose,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState<string>(openAPIKey);

  const handleSave = () => {
    onSave(apiKey);
    onClose();
  };

  return (
    <EuiFlyout onClose={onClose} size="m">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h3>
            {i18n.translate('aiPlayground.sidebar.openAIFlyOut.headerTitle', {
              defaultMessage: 'OpenAI API Key',
            })}
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiFlexGroup direction="column" gutterSize="l">
          <EuiFormRow
            fullWidth
            label={i18n.translate('aiPlayground.sidebar.openAIFlyOut.labelTitle', {
              defaultMessage: 'OpenAI API Key',
            })}
            labelAppend={
              <EuiText size="xs">
                <EuiLink target="_blank" href="https://platform.openai.com/api-keys">
                  OpenAI API Keys
                </EuiLink>
              </EuiText>
            }
          >
            <EuiFlexItem grow>
              <EuiFieldText
                fullWidth
                placeholder={i18n.translate('aiPlayground.sidebar.openAIFlyOut.placeholder', {
                  defaultMessage: 'Enter API Key here',
                })}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </EuiFlexItem>
          </EuiFormRow>
        </EuiFlexGroup>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              data-telemetry-id="entSearchAIPlayground-addingOpenAIKey-cancel"
              onClick={onClose}
            >
              {i18n.translate('aiPlayground.sidebar.openAIFlyOut.cancelButtonLabel', {
                defaultMessage: 'Cancel',
              })}
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
          <EuiFlexItem grow={false}>
            <EuiButton
              isDisabled={!apiKey.trim()}
              data-telemetry-id="entSearchAIPlayground-addingOpenAIKey-save"
              fill
              onClick={handleSave}
            >
              {i18n.translate('aiPlayground.sidebar.openAIFlyOut.saveButtonLabel', {
                defaultMessage: 'Save',
              })}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};
