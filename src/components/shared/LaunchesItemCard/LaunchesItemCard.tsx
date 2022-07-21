import React from 'react';

import { ILaunchQueryPopulated } from 'schemas/launch_d';
import { dateFormatter } from 'utils/functions';

import Card from '../Card/Card';
import ImageLogo from '../ImageLogo/ImageLogo';
import { ILaunchCardProps } from '../LaunchCard/LaunchCard';

import './LaunchesItemCard.scss';

interface ILaunchesItemCardProps<T> extends Omit<ILaunchCardProps<T>, 'title'> {}

const LaunchesItemCard = <T extends ILaunchQueryPopulated>({
  data,
  requestStatus,
  requestError,
  isLoading = false,
}: ILaunchesItemCardProps<T>) => {
  return (
    <Card
      cardStyleContentId="launches-item-card__main-card"
      {...{
        requestStatus,
        requestError,
        isLoading,
      }}
    >
      <div>
        <h4>Mission Patch</h4>
        <ImageLogo src={data?.links?.patch?.small} alt="Mission Patch" />
      </div>
      <div className="launches-item-card__inner-div">
        <div>
          <h4>Mission</h4>
          <h4>{data?.name}</h4>
        </div>
        <div>
          <h4>Flight Number</h4>
          <h4>{data?.flight_number}</h4>
        </div>
      </div>
      <div className="launches-item-card__inner-div">
        <div>
          <h4>Status</h4>
          {/* TODO: Fix nested ternary operator - Add icons instead of text for SUCCESS and FAILURE */}
          {/* eslint-disable-next-line no-nested-ternary */}
          <h4>{data?.upcoming ? 'Upcoming' : data?.success ? 'Success' : 'Failure'}</h4>
        </div>
        <div>
          <h4>UTC Time</h4>
          <h4>{dateFormatter(data?.date_utc)}</h4>
        </div>
      </div>
      <div className="launches-item-card__inner-div">
        <div>
          <h4>Rocket</h4>
          <h4>{data?.rocket?.name}</h4>
        </div>
        <div>
          <h4>Launchpad</h4>
          <h4>{data?.launchpad.name}</h4>
        </div>
      </div>
    </Card>
  );
};

export default LaunchesItemCard;
