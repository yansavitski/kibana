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
  EuiForm,
  EuiFormControlLayout,
  EuiFormRow,
  EuiText,
} from '@elastic/eui';
import React, { Controller, useForm } from 'react-hook-form';
import { i18n } from '@kbn/i18n';
import { useKibana } from '@kbn/kibana-react-plugin/public';
import { FormattedMessage } from '@kbn/i18n-react';
import { AIPlaygroundPluginStartDeps } from '../../../types';
import { useCreateApiKeyQuery } from '../../hooks/useCreateApiKeyQuery';

enum ApiKeyFormFields {
  Name = 'name',
  ExpireInDays = 'expiresInDays',
}

interface ApiKeyForm {
  [ApiKeyFormFields.Name]: string;
  [ApiKeyFormFields.ExpireInDays]: number;
}

export const CreateApiKeyForm = () => {
  const { http } = useKibana<AIPlaygroundPluginStartDeps>().services;
  const managementApiKeysLinks = http.basePath.prepend('/app/management/security/api_keys');
  const {
    control,
    getValues,
    reset,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useForm<ApiKeyForm>();
  const { action, isLoading, isSuccess, isError } = useCreateApiKeyQuery();
  const onSubmit = async (data: ApiKeyForm) => {
    await action(data);

    reset(getValues());
  };

  return (
    <EuiForm>
      <EuiFormRow
        fullWidth
        label={i18n.translate('playground.viewCode.apiForm.name.label', {
          defaultMessage: 'Name',
        })}
      >
        <Controller
          name={ApiKeyFormFields.Name}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <EuiFieldText
              fullWidth
              placeholder={i18n.translate('playground.viewCode.apiForm.name.placeholder', {
                defaultMessage: 'Enter a name for your API key',
              })}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </EuiFormRow>

      <EuiFormRow fullWidth label="Lifetime">
        <Controller
          name={ApiKeyFormFields.ExpireInDays}
          control={control}
          rules={{ min: 0, required: true }}
          render={({ field }) => (
            <EuiFormControlLayout
              fullWidth
              append={
                <EuiText size="xs">
                  <strong>
                    <FormattedMessage
                      id="playground.viewCode.apiForm.expire.days"
                      defaultMessage="Days"
                    />
                  </strong>
                </EuiText>
              }
            >
              <EuiFieldText
                fullWidth
                type="number"
                placeholder={i18n.translate('playground.viewCode.apiForm.expire.placeholder', {
                  defaultMessage: 'Set expiry in days',
                })}
                value={field.value || ''}
                onChange={field.onChange}
              />
            </EuiFormControlLayout>
          )}
        />
      </EuiFormRow>

      <EuiFormRow fullWidth>
        <EuiFlexGroup gutterSize="m">
          {isSuccess && !isDirty ? (
            <EuiButton color="success" iconType="check">
              <FormattedMessage
                id="playground.viewCode.apiForm.createdButton"
                defaultMessage="Created"
              />
            </EuiButton>
          ) : (
            <EuiButton
              isDisabled={!isValid || isLoading}
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}
              color={isError ? 'danger' : 'primary'}
            >
              <FormattedMessage
                id="playground.viewCode.apiForm.createButton"
                defaultMessage="Create API key"
              />
            </EuiButton>
          )}

          <EuiButtonEmpty
            iconSide="left"
            iconType="popout"
            href={managementApiKeysLinks}
            target="_blank"
          >
            <FormattedMessage
              id="playground.viewCode.apiForm.viewKeysButton"
              defaultMessage="View all API keys"
            />
          </EuiButtonEmpty>
        </EuiFlexGroup>
      </EuiFormRow>
    </EuiForm>
  );
};
