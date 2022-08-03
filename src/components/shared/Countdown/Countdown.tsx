import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { TDuration } from 'schemas/utils_d';

import { MILLISECONDS_INTERVAL } from 'utils/constants';
import {
  areArgsTruthy,
  conditionalRender,
  formatDateNumber,
  getDurationInterval,
  getNestedObjectPropertyByPathName,
} from 'utils/functions';

import './Countdown.scss';

const initializeDurationObject = () => ({} as Record<TDuration, number>);

interface ICountdownProps {
  unixTime: number;
  isLoading?: boolean;
  hasTitle?: boolean;
}

/* TECH-DEBT FIXED TO-CHECK IMPORTANT: When upcoming mission countdown hits 0, timer starts increasing - indicating "Current Launch" time
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

const Countdown: React.FC<ICountdownProps> = ({ unixTime, isLoading, hasTitle }) => {
  /* TODO I see two options here:
    Current scenario: Nothing is displayed while !Object.entries(durationObject).length
      Problems: - Delay in rendering countdown timer between isLoading === false and actual node render
                - Height of div is 0 when there's no content, then icreases when timer countdown renders
      Solutions: Either set minimum height for div so that it won't shrik when it's empty, or
                 initialize all durationObject's properties to 0, so that 0 00 00 00 will be displayed
                 while API data is being fetched 
  */
  const [durationObject, setDurationObject] = useState<Record<TDuration, number>>(() =>
    initializeDurationObject(),
  );
  // We want to display a specific string whether event has happened or will happen
  const [momentInTime, setMomentInTime] = useState<string>('');

  useEffect(() => {
    const now = moment().unix();
    const diffTime = moment(unixTime).diff(now);

    diffTime > 0 ? setMomentInTime('next') : setMomentInTime('current');

    const countdownInterval = setInterval(() => {
      setDurationObject(getDurationInterval(diffTime));
    }, MILLISECONDS_INTERVAL);

    return () => {
      clearInterval(countdownInterval);
    };
  });

  if (isLoading) return <p>Loading...</p>;

  return conditionalRender(
    areArgsTruthy(Object.entries(durationObject).length),
    <article className="countdown-container" data-testid="Countdown">
      {/* TODO Ideally title logic should be extracted in ad hoc countdown component -
      smth like LaunchComponent which implements Countdown */}
      {conditionalRender(
        areArgsTruthy(hasTitle),
        <h3 data-testid="CountdownTitle">{momentInTime} launch</h3>,
      )}
      {Object.entries(durationObject).map(([key]) => {
        return (
          <div className="countdown__content" key={key}>
            <h2>{formatDateNumber(getNestedObjectPropertyByPathName(durationObject, [key]))}</h2>
            <h2>{key}</h2>
          </div>
        );
      })}
    </article>,
  );
};

export default Countdown;
