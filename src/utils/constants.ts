import { IRadioGroupOption } from 'components/shared/buttons/RadioGroup/RadioGroup';

export const MILLISECONDS_INTERVAL = 1000;

// Sort options accepted by Mongoose, a.k.a. SpaceX API's ORM
export const SORT_OPTIONS: Array<IRadioGroupOption> = [
  { label: 'ASCENDING', value: 'asc' },
  { label: 'DESCENDING', value: 'desc' },
];
