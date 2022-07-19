import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from 'utils/constants';
import { getDurationInterval, getNestedObjectPropertyByPathName } from 'utils/functions';

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
      <div className="countdown__days">
        {getNestedObjectPropertyByPathName(durationObject, ['days'])}
      </div>
      <div className="countdown__hours">
        {getNestedObjectPropertyByPathName(durationObject, ['hours'])}
      </div>
      <div className="countdown__minutes">
        {getNestedObjectPropertyByPathName(durationObject, ['minutes'])}
      </div>
      <div className="countdown__seconds">
        {getNestedObjectPropertyByPathName(durationObject, ['seconds'])}
      </div>
    </div>
  );
};

export default Countdown;
