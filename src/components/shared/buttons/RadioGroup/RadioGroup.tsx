import React, { FunctionComponent } from 'react';

import { Radio, RadioChangeEvent } from 'antd';
import { RadioGroupOptionType } from 'antd/lib/radio';

export interface IOption {
  label: string;
  value: string;
}

interface IRadioGroupProps {
  options: Array<IOption>;
  value: string;
  onChange: (e: RadioChangeEvent) => void;
  radioType?: RadioGroupOptionType;
  className?: string;
}

const RadioGroup: FunctionComponent<IRadioGroupProps> = ({
  options,
  value,
  onChange,
  radioType = 'button',
  className = '',
}) => {
  return (
    <Radio.Group
      data-testid="RadioGroup"
      options={options}
      onChange={onChange}
      value={value}
      optionType={radioType}
      className={className}
    />
  );
};

export default RadioGroup;
