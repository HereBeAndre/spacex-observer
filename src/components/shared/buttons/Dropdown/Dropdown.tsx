import React, { FunctionComponent } from 'react';

import { Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { getNestedObjectPropertyByPathName } from 'utils/functions';
import { TOptionArray } from 'utils/constants';

const { Option } = Select;

interface IDropdownProps {
  options: TOptionArray;
  handleChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => void;
  className?: string;
}

const Dropdown: FunctionComponent<IDropdownProps> = ({ options, handleChange, className = '' }) => {
  return (
    <Select
      defaultValue={getNestedObjectPropertyByPathName(options, ['0', 'value'])}
      className={className}
      onChange={handleChange}
    >
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default Dropdown;
