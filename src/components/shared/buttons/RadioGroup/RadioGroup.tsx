import React, { FunctionComponent } from 'react';

import { Radio, RadioChangeEvent } from 'antd';
import { RadioGroupOptionType } from 'antd/lib/radio';

export interface IRadioGroupOption {
  label: string;
  value: string;
}

interface IRadioGroupProps {
  options: Array<IRadioGroupOption>;
  value: string;
  onChange: (e: RadioChangeEvent) => void;
  radioType?: RadioGroupOptionType;
}

const RadioGroup: FunctionComponent<IRadioGroupProps> = ({
  options,
  value,
  onChange,
  radioType = 'button',
}) => {
  return <Radio.Group options={options} onChange={onChange} value={value} optionType={radioType} />;
};

export default RadioGroup;
