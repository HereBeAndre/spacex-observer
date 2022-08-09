import React, { FunctionComponent } from 'react';
import { Moment } from 'moment';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from 'antd';

import { DATE_FORMAT } from 'utils/constants';

interface ILaunchFormProps {
  onSubmit: SubmitHandler<FieldValues>;
}

const LaunchForm: FunctionComponent<ILaunchFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control, setValue, reset } = useForm();

  const onDateFromChange = (momentDate: Moment | null) => setValue('dateFrom', momentDate);

  const onDateToChange = (momentDate: Moment | null) => setValue('dateTo', momentDate);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="dateFrom"
        control={control}
        render={({ field: { value } }) => (
          <DatePicker onChange={onDateFromChange} value={value} format={DATE_FORMAT} />
        )}
      />
      <Controller
        name="dateTo"
        control={control}
        render={({ field: { value } }) => (
          <DatePicker onChange={onDateToChange} value={value} format={DATE_FORMAT} />
        )}
      />
      <input type="submit" />
    </form>
  );
};

export default LaunchForm;
