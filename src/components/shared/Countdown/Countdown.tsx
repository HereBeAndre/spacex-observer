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
      {Object.entries(durationObject).map((entry) => {
        return (
          <div className="countdown__content">
            <h2>
              {formatDateNumber(getNestedObjectPropertyByPathName(durationObject, [entry[0]]))}
            </h2>
            <h2>{entry[0]}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Countdown;
