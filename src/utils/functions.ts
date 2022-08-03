import moment, { DurationInputArg2 } from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from './constants';

// START ~ GETTER FUNCTIONS
const getAbsoluteValue = (num: number) => Math.abs(num);

// TECH-DEBT solution has room for improvement
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
// END ~ GETTER FUNCTIONS

// START ~ FORMATTERS
export const dateFormatter = (date?: number | string, format: string = 'MMMM D YYYY, h:mm:ss A') =>
  date && moment(date).format(format);

// TODO Might be useless if better moment solution for countdown is implemented
// USAGE ~ Format countdown numbers when they're less than 9
export function formatDateNumber(input: number): string | number {
  // FIXME: When countdown hits 00, input arrives as `undefined` instead of `number`
  if (input === undefined) return '00';
  if (input <= 9) return `0${input}`;
  return input;
}

export const buildUrl = (url: string[]) => url.join('/');

export const toString = (x: any): string => x.toString();
// END ~ FORMATTERS

// START ~ GUARDS
export function typeGuardFunction<T>(object: T, key: string): boolean {
  return key in object;
}

export const areArgsTruthy = (...args: any[]) => args.every(Boolean);

// USAGE ~ Throw errors which are then visible in Sentry
export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
};
// END ~ GUARDS

export function conditionalRender<T>(condition: boolean, component: T): T | null {
  return condition ? component : null;
}
