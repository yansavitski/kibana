/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty, EuiFormRow } from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import { OpenAIKeyCallout } from './open_ai_key_callout';

import { OpenAIKeyFlyOut } from './open_ai_key_flyout';
import { i18n } from '@kbn/i18n';
import { OpenAISummarizationModel } from './open_ai_summarization_model';
import { Control, Controller, useForm } from 'react-hook-form';
import { ChatForm, ChatFormFields } from '../types';

interface OpenAIKeyFieldProps {
  control: Control<ChatForm, any>;
  openAIKey: string | undefined;
}

export const OpenAIKeyField: React.FC<OpenAIKeyFieldProps> = ({ control, openAIKey }) => {
    const [isOpenAIFlyOutOpen, setIsOpenAIFlyOutOpen] = useState<boolean>(false);
    const {getValues, register} = useForm<ChatForm>();
    const key = getValues(ChatFormFields.openAIKey);
    console.log('openAIKey from component', key);
  
    const handleOpenAIFlyOut = () => {
      setIsOpenAIFlyOutOpen(!isOpenAIFlyOutOpen);
    };

    return (
    <EuiFormRow>
      <>
        {isOpenAIFlyOutOpen && (
          <Controller
            name={ChatFormFields.openAIKey}
            control={control}
            render={({ field }) => (
              <OpenAIKeyFlyOut register={register} openAPIKey={field.value} onSave={field.onChange} onClose={handleOpenAIFlyOut} />
            )}
          />
        )}
        {openAIKey ? (
            <Controller
              name={ChatFormFields.summarizationModel}
              control={control}
              render={({ field }) => (
                <OpenAISummarizationModel model={field.value} onSelect={field.onChange} openAIFlyOutOpen={handleOpenAIFlyOut} />
              )}
            />
        ) : (
          <OpenAIKeyCallout openAIFlyOutOpen={handleOpenAIFlyOut} />
        )}
        {/* {isOpenAIFlyOutOpen && (
          <Controller
            name={ChatFormFields.openAIKey}
            control={control}
            render={({ field }) => (
              <OpenAIKeyFlyOut openAPIKey={field.value} onSave={field.onChange} onClose={handleOpenAIFlyOut} />
            )}
          />
        )}
        {somelean &&  <Controller
          name={ChatFormFields.summarizationModel}
          control={control}
          render={({ field: { onChange, value } }) => {
            return(
              <>
                {
                  value ? (
                    <OpenAISummarizationModel register={register} model={value} onSelect={onChange} openAIFlyOutOpen={handleOpenAIFlyOut} />
                  ) : (
                    
                  )
                }
              </>
            )
          }}
            
        />} */}
       
      </>
    </EuiFormRow>
  );
};

// props (showCallout = true)


// interface OpenAIKeyFieldProps {
//   apiKey: string;
//   onSave: () => void;
// }



// export const OpenAIKeyField: React.FC<OpenAIKeyFieldProps> = ({ apiKey, onSave }) => {
//   const [isOpenAIFlyOutOpen, setIsOpenAIFlyOutOpen] = useState<boolean>(false);

//   const onCloseOpenAIFlyOut = () => {
//     setIsOpenAIFlyOutOpen(!isOpenAIFlyOutOpen);
//   };
//   const handleOpenAIFlyOut = () => {
//     setIsOpenAIFlyOutOpen(true);
//   };

//   return (
//     <EuiFormRow>
//       <>
//         {isOpenAIFlyOutOpen && (
//           <OpenAIKeyFlyOut openAPIKey={apiKey} onSave={onSave} onClose={onCloseOpenAIFlyOut} />
//         )}
//         {apiKey ? (
//           <OpenAISummarizationModel openAIFlyOutOpen={handleOpenAIFlyOut} />
//         ) : (
//           <OpenAIKeyCallout openAIFlyOutOpen={handleOpenAIFlyOut} />
//         )}
//       </>
//     </EuiFormRow>
//   );
// };
