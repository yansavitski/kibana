/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty, EuiFormRow } from '@elastic/eui';
import React, { useState } from 'react';
import { OpenAIKeyCallout } from './open_ai_key_callout';

import { OpenAIKeyFlyOut } from './open_ai_key_flyout';
import { i18n } from '@kbn/i18n';
import { OpenAISummarizationModel } from './open_ai_summarization_model';

interface OpenAIKeyFieldProps {
  apiKey: string;
  onSave: () => void;
}

export const OpenAIKeyField: React.FC<OpenAIKeyFieldProps> = ({ apiKey, onSave }) => {
  const [isOpenAIFlyOutOpen, setIsOpenAIFlyOutOpen] = useState<boolean>(false);

  const onCloseOpenAIFlyOut = () => {
    setIsOpenAIFlyOutOpen(!isOpenAIFlyOutOpen);
  };
  const handleOpenAIFlyOut = () => {
    setIsOpenAIFlyOutOpen(true);
  };

  return (
    <EuiFormRow>
      <>
        {isOpenAIFlyOutOpen && (
          <OpenAIKeyFlyOut openAPIKey={apiKey} onSave={onSave} onClose={onCloseOpenAIFlyOut} />
        )}
        {apiKey ? (
          <OpenAISummarizationModel openAIFlyOutOpen={handleOpenAIFlyOut} />
        ) : (
          <OpenAIKeyCallout openAIFlyOutOpen={handleOpenAIFlyOut} />
        )}
      </>
    </EuiFormRow>
  );
};
