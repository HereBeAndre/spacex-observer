import moment, { DurationInputArg2 } from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from './constants';

export function typeGuardFunction<T>(object: T, key: string): boolean {
  return key in object;
}

// TODO: moment => Consider replacing `.duration` with `.diff`
export function getDurationInterval(
  unixTime: number,
  unit: DurationInputArg2 = 'milliseconds',
): Record<TDuration, number> {
  const duration = moment.duration(unixTime * MILLISECONDS_INTERVAL, unit);
  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
}

export function getNestedObjectPropertyByPathName<T extends unknown>(
  nestedObject: T,
  pathName: Array<any>, // TODO: Fix any with smth like keyof
) {
  return pathName.reduce(
    (object, key) => (object && object[key] ? object[key] : undefined),
    nestedObject,
  );
}
