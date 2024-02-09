/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from "react";

import { EuiButton, EuiCallOut } from "@elastic/eui";

import { i18n } from "@kbn/i18n";

interface OpenAIKeyCalloutProps {
  setIsOpenAIFlyOutOpen: (flyOut: boolean) => void;
}

export const OpenAIKeyCallout: React.FC<OpenAIKeyCalloutProps> = ({ setIsOpenAIFlyOutOpen }) => {
  return (
    <EuiCallOut
      title={i18n.translate(
        'aiPlayground.sidebar.openAICallout.headerText',
        {
          defaultMessage: 'Add OpenAI API Key',
        }
      )}
      color="warning" 
      iconType="warning"
    >
      <p>
        {i18n.translate(
          'aiPlayground.sidebar.openAICallout.description',
          {
            defaultMessage: 'The AI Playground uses OpenAl models for summarization. Add your OpenAI API key to continue.',
          }
        )}
      </p>
      <EuiButton
        onClick={() => setIsOpenAIFlyOutOpen(true)} 
        color="warning"
        fill
        data-test-subj="openaiflyout-open"
      >
        {i18n.translate(
          'aiPlayground.sidebar.openAICallout.buttonLabelText',
          {
            defaultMessage: 'Add OpenAI API Key',
          }
        )}
      </EuiButton>
    </EuiCallOut>
  );
};
