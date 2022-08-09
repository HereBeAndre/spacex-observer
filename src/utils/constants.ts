import { IOption } from 'components/shared/buttons/RadioGroup/RadioGroup';

export const MILLISECONDS_INTERVAL = 1000;

export const DATE_FORMAT = 'MM-DD-YYYY';

export type TOptionArray = Array<IOption>;

// Sort options accepted by Mongoose, SpaceX API's ORM
export const SORT_OPTIONS: TOptionArray = [
  { label: 'ASCENDING', value: 'asc' },
  { label: 'DESCENDING', value: 'desc' },
];

export const LAUNCHES_TYPE_OPTIONS: TOptionArray = [
  { label: 'UPCOMING LAUNCHES', value: 'upcoming' },
  { label: 'PAST LAUNCHES', value: 'past' },
];
