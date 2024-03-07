/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiFormLabel,
  EuiCodeBlock,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiSteps,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import React, { useMemo } from 'react';
import { CreateApiKeyForm } from './create_api_key_form';

interface VideCodeFlyoutProps {
  onClose: () => void;
}

export const VideCodeFlyout: React.FC<VideCodeFlyoutProps> = ({ onClose }) => {
  const steps = useMemo(
    () => [
      {
        title: i18n.translate('playground.viewCode.flyout.step.apiKeyTitle', {
          defaultMessage: 'Generate and copy an API key',
        }),
        children: (
          <>
            <EuiText>
              <p>
                <FormattedMessage
                  id="playground.viewCode.flyout.step.apiKeyDescription"
                  defaultMessage="You will only be able to see this API key once after creation."
                />
              </p>
            </EuiText>
            <EuiSpacer />
            <CreateApiKeyForm />
          </>
        ),
      },
      {
        title: i18n.translate('playground.viewCode.flyout.step.createApplication', {
          defaultMessage: 'Create application',
        }),
        children: (
          <>
            <EuiFormLabel>
              <FormattedMessage
                id="playground.viewCode.flyout.step.installLabel"
                defaultMessage="Use this code in your CLI"
              />
            </EuiFormLabel>
            <EuiSpacer size="s" />
            <EuiCodeBlock language="bash" isCopyable>
              npm install
            </EuiCodeBlock>
          </>
        ),
      },
    ],
    []
  );

  return (
    <EuiFlyout ownFocus onClose={onClose}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>
            <FormattedMessage id="playground.viewCode.flyout.title" defaultMessage="Export" />
          </h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText color="subdued">
          <p>
            <FormattedMessage
              id="playground.viewCode.flyout.subtitle"
              defaultMessage="Use this custom built playground experience in your application"
            />
          </p>
        </EuiText>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiSteps steps={steps} headingElement="h2" />
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};
