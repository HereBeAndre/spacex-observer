import moment from 'moment';
import React from 'react';
import { ILaunch } from 'schemas/launch_d';

import Card from '../Card/Card';

import './LaunchCard.scss';

interface ILaunchCardProps<T> {
  data?: T;
  title: string;
}

const LaunchCard = <T extends ILaunch>({ data, title }: ILaunchCardProps<T>) => {
  return (
    <Card title={title}>
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
            <p>{moment(data?.date_utc).format('MMMM D YYYY, h:mm:ss A')}</p>
          </div>
        </div>
      </div>
      <div className="launchcard-outer-div">
        <div className="launchcard-inner-div">
          <div className="launchcard-inner-content">
            <h4>Mission Patch</h4>
            <img
              src={data?.links?.patch?.small}
              alt="Mission Patch"
              style={{ maxWidth: '180px' }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaunchCard;
