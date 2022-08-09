import React, { FunctionComponent } from 'react';
import { Moment } from 'moment';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';

import { DATE_FORMAT } from 'utils/constants';

interface ILaunchFormProps {
  onSubmit: SubmitHandler<FieldValues>;
}

const LaunchForm: FunctionComponent<ILaunchFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control, setValue, getValues, reset } = useForm();

  const onFromDateChange = (momentDate: Moment | null) => setValue('fromDate', momentDate);

  const onToDateChange = (momentDate: Moment | null) => setValue('toDate', momentDate);

  const disabledFutureDates: RangePickerProps['disabledDate'] = (current): boolean =>
    current && current > getValues('toDate');

  const disabledPastDates: RangePickerProps['disabledDate'] = (current): boolean =>
    current && current < getValues('fromDate');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fromDate"
        control={control}
        render={({ field: { value } }) => (
          <DatePicker
            onChange={onFromDateChange}
            value={value}
            format={DATE_FORMAT}
            disabledDate={disabledFutureDates}
            placeholder="From Date"
          />
        )}
      />
      <Controller
        name="toDate"
        control={control}
        render={({ field: { value } }) => (
          <DatePicker
            onChange={onToDateChange}
            value={value}
            format={DATE_FORMAT}
            disabledDate={disabledPastDates}
            placeholder="To Date"
          />
        )}
      />
      <input type="submit" />
    </form>
  );
};

export default LaunchForm;
