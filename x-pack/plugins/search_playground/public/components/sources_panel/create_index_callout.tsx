/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButton, EuiCallOut, EuiSpacer, EuiText } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import React, { useCallback, useMemo } from 'react';
import { useKibana } from '../../hooks/use_kibana';
import { CREATE_INDEX_LOCATOR_ID } from '../../../common';

export const CreateIndexCallout: React.FC = () => {
  const {
    services: { application, share },
  } = useKibana();
  const createIndexLocator = useMemo(() => {
    const locator = share.url.locators.get(CREATE_INDEX_LOCATOR_ID);

    if (!locator) {
      throw new Error(`Create index locator not registered`);
    }

    return locator;
  }, [share.url.locators]);
  const handleNavigateToIndex = useCallback(async () => {
    const createIndexUrl = await createIndexLocator?.getUrl({});

    if (createIndexUrl) {
      application?.navigateToUrl(createIndexUrl);
    }
  }, [application, createIndexLocator]);

  return (
    <EuiCallOut
      title={i18n.translate('xpack.searchPlayground.sources.createIndexCallout.headerText', {
        defaultMessage: 'Create an index',
      })}
      color="primary"
      iconType="iInCircle"
    >
      <EuiText size="s">
        <p>
          <FormattedMessage
            id="xpack.searchPlayground.sources.createIndexCallout.description"
            defaultMessage="You can not continue without having at least one index with data to search."
          />
        </p>
      </EuiText>
      <EuiSpacer size="l" />
      <EuiButton
        color="primary"
        iconType="plusInCircle"
        fill
        size="s"
        onClick={handleNavigateToIndex}
      >
        <FormattedMessage
          id="xpack.searchPlayground.sources.createIndexCallout."
          defaultMessage="Create an index"
        />
      </EuiButton>
    </EuiCallOut>
  );
};
