import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from 'utils/constants';
import {
  formatDateNumber,
  getDurationInterval,
  getNestedObjectPropertyByPathName,
} from 'utils/functions';

import './Countdown.scss';

interface ICountdownProps {
  unixTime: number;
  isLoading?: boolean;
}

// TODO! Fix delay in displaying countdown timer

/* TODO! IMPORTANT: When upcoming mission countdown hits 0, timer starts increasing - indicating "Current Launch" time
  Right now, this is being displayed:
  00
  DAYS
  
  0-14
  HOURS
  
  0-22
  MINUTES
  
  0-43
  SECONDS
*/

const Countdown: React.FC<ICountdownProps> = ({ unixTime, isLoading }) => {
  // TODO! Fix any
  const [durationObject, setDurationObject] = useState<Record<TDuration, number>>({} as any);

  useEffect(() => {
    const now = moment().unix();
    const diffTime = unixTime ? unixTime - now : 0;

    const countdownInterval = setInterval(() => {
      setDurationObject(getDurationInterval(diffTime));
    }, MILLISECONDS_INTERVAL);

    return () => {
      clearInterval(countdownInterval);
    };
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="countdown-container">
      {Object.entries(durationObject).map(([key]) => {
        return (
          <div className="countdown__content" key={key}>
            <h2>{formatDateNumber(getNestedObjectPropertyByPathName(durationObject, [key]))}</h2>
            <h2>{key}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Countdown;
