import moment, { DurationInputArg2 } from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from './constants';

export function typeGuardFunction<T>(object: T, key: string): boolean {
  return key in object;
}

const getAbsoluteValue = (num: number) => Math.abs(num);

// TODO TECH-DEBT solution has room for improvement
export function getDurationInterval(
  unixTime: number,
  unit: DurationInputArg2 = 'milliseconds',
): Record<TDuration, number> {
  const duration = moment.duration(unixTime * MILLISECONDS_INTERVAL, unit);
  return {
    days: getAbsoluteValue(duration.days()),
    hours: getAbsoluteValue(duration.hours()),
    minutes: getAbsoluteValue(duration.minutes()),
    seconds: getAbsoluteValue(duration.seconds()),
  };
}

// Fix it in branch named tech-debt/narrow-pathname-type-annotation
// Resource => https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints
export function getNestedObjectPropertyByPathName<T extends unknown>(
  nestedObject: T,
  pathName: Array<any>, // TODO: Fix any with smth like keyof
) {
  return pathName.reduce(
    (object, key) => (object && object[key] ? object[key] : undefined),
    nestedObject,
  );
}

// TODO Might be useless if better moment solution for countdown is implemented
// USAGE ~ Format countdown numbers when they're less than 9
export function formatDateNumber(input: number): string | number {
  // FIXME: When countdown hits 00, input arrives as `undefined` instead of `number`
  if (input === undefined) return '00';
  if (input <= 9) return `0${input}`;
  return input;
}

export const dateFormatter = (date?: number | string, format: string = 'MMMM D YYYY, h:mm:ss A') =>
  date && moment(date).format(format);

export const areArgsTruthy = (...args: any[]) => args.every(Boolean);

export const buildUrl = (url: string[]) => url.join('/');
