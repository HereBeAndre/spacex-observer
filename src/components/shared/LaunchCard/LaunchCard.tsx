import React from 'react';

import { ILaunch } from 'schemas/launch_d';

import { dateFormatter } from 'utils/functions';

import Card, { ICardProps } from 'components/shared/Card/Card';
import ImageLogo from 'components/shared/ImageLogo/ImageLogo';

import './LaunchCard.scss';

export interface ILaunchCardProps<T> extends ICardProps {
  data?: T;
}

/* <LaunchCard /> component is a wrapper for <Card /> component and it is
specifically designed to display NEXT and PREVIOUS launch data */
const LaunchCard = <T extends ILaunch>({
  data,
  title,
  requestStatus,
  requestError,
  isLoading = false,
}: ILaunchCardProps<T>) => {
  return (
    <Card
      title={title}
      requestStatus={requestStatus}
      requestError={requestError}
      isLoading={isLoading}
      onClick={() => console.log('Fetch mission data')}
    >
      <div className="launchcard-outer-div">
        <div className="launchcard-inner-div">
          <div className="launchcard-inner-content">
            <h4>Mission Name</h4>
            <p>{data?.name}</p>
          </div>
        </div>
        <div className="launchcard-inner-div">
          <div className="launchcard-inner-content">
            <h4>Flight Number</h4>
            <p>{data?.flight_number}</p>
          </div>
        </div>
        <div className="launchcard-inner-div">
          <div className="launchcard-inner-content">
            <h4>UTC Time</h4>
            <p>{dateFormatter(data?.date_utc)}</p>
          </div>
        </div>
      </div>
      <div className="launchcard-outer-div">
        <div className="launchcard-inner-div">
          <div className="launchcard-inner-content">
            <h4>Mission Patch</h4>
            <ImageLogo src={data?.links?.patch?.small} alt="Mission Patch" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaunchCard;
