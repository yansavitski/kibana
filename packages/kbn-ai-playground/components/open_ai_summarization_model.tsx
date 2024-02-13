import React, {useState} from "react";

import { EuiButtonEmpty, EuiComboBox, EuiComboBoxOptionOption, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiIcon, EuiLink, EuiSelectable, EuiSelectableOption, EuiText, EuiTitle, EuiToolTip } from "@elastic/eui";

import { i18n } from "@kbn/i18n";

const Summarization_Model: EuiComboBoxOptionOption[] = [
  {
    key: 'gpt-3.5-turbo',
    label: 'gpt-3.5-turbo',
  },
  {
    key: 'gpt-3.5-turbo-1106',
    label: 'gpt-3.5-turbo-1106',
  },
  {
    key: 'gpt-3.5-turbo-16k',
    label: 'gpt-3.5-turbo-16k',
  },
  {
    key: 'gpt-3.5-turbo-16k-0613',
    label: 'gpt-3.5-turbo-16k-0613',
  },
  {
    key: 'gpt-3.5-turbo-instruct',
    label: 'gpt-3.5-turbo-instruct',
  },
];

interface OpenAISummarizationModelProps {
  openAIFlyOutOpen: (flyOut: boolean) => void;
}

export const OpenAISummarizationModel: React.FC<OpenAISummarizationModelProps> = ({openAIFlyOutOpen}) => {

  const [selectedOptions, setSelected] = useState<string>('gpt-3.5-turbo-1106');

  const onChange = (selectedOptions: EuiComboBoxOptionOption) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions.label);
  };

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxxs">
            <h5>
              {i18n.translate('aiPlayground.sidebar.summarizationModel.label', {
                defaultMessage: 'Summarization Model',
              })}
              <EuiToolTip
                content={i18n.translate('aiPlayground.sidebar.summarizationModel.help', {
                  defaultMessage:
                    'Provide specific instructions such as task requirements, desired tone, and context. This will help optimize how responses are generated.',
                })}
              >
                <EuiIcon type="questionInCircle" color="subdued" />
              </EuiToolTip>    
            </h5>
          </EuiTitle>   
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty flush="both" size="xs" onClick={() => openAIFlyOutOpen}>
            {i18n.translate('aiPlayground.sidebar.summarizationModel.editLabel', {
              defaultMessage: 'Edit OpenAI API key',
            })}
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiComboBox
          aria-label={i18n.translate('aiPlayground.sidebar.summarizationModel.comboBox', {
            defaultMessage: 'Combo box for selecting Open AI Summarization models',
          })}
          singleSelection={{ asPlainText: true }}
          options={Summarization_Model}
          selectedOptions={selectedOptions}
          onChange={onChange}
        />
      </EuiFlexGroup>
    </EuiFlexGroup>
    
  );
};
