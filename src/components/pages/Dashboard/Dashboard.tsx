import React from 'react';
// import { useQueryClient } from '@tanstack/react-query';
import { RouteComponentProps } from '@reach/router';

import { getFiveUpcomingLaunches, getLaunch } from 'api';
import { ApiEndpoints } from 'api/urls';

import Grid from 'components/layout/Grid/Grid';
import LaunchCard from 'components/shared/LaunchCard/LaunchCard';
import MainLayout from 'components/layout/MainLayout/MainLayout';
import Countdown from 'components/shared/Countdown/Countdown';
import LaunchesItemCard from 'components/shared/LaunchesItemCard/LaunchesItemCard';
import Button from 'components/shared/Button/Button';
import { APP_ROUTES } from 'components/routes/routes';

import { getNestedObjectPropertyByPathName, throwError } from 'utils/functions';

import './Dashboard.scss';

/* TODO! Prevent react-query from fetching same data over and over on Dashboard re-render
https://tanstack.com/query/v4/docs/guides/important-defaults */

const Dashboard = ({ navigate }: RouteComponentProps) => {
  // TODO: May be useless?
  // const queryClient = useQueryClient();

  // TODO: Use metadata from response in file
  const {
    status: nextLaunchRequestStatus,
    data: nextLaunchData,
    isError: isNextLaunchError,
    error: nextLaunchError,
    isFetching: isNextLaunchFetching,
  } = getLaunch('nextLaunch', ApiEndpoints.NEXT_LAUNCH);

  // TODO: Use metadata from response in file
  const {
    data: latestLaunchData,
    isError: isLatestLaunchError,
    error: latestLaunchError,
    isFetching: isLatestLaunchFetching,
  } = getLaunch('latestLaunch', ApiEndpoints.LATEST_LAUNCH);

  // TODO: Use metadata from response in file
  const {
    data: upcomingLaunches,
    isError: isFiveUpcomingLaunchesError,
    error: fiveUpcomingLaunchesError,
    isFetching: isFiveUpcomingLaunchesFetching,
  } = getFiveUpcomingLaunches();

  const onButtonClick = () => navigate!(APP_ROUTES.LAUNCHES);

  // TODO TECH-DEBT refactor - DRY violated
  if (isNextLaunchError) {
    throwError(nextLaunchError);
  }

  if (isLatestLaunchError) {
    throwError(latestLaunchError);
  }

  if (isFiveUpcomingLaunchesError) {
    throwError(fiveUpcomingLaunchesError);
  }

  return (
    <MainLayout>
      <Countdown
        unixTime={getNestedObjectPropertyByPathName(nextLaunchData, ['date_unix'])}
        isLoading={isNextLaunchFetching}
        hasTitle
      />
      <Grid>
        <LaunchCard
          title="Next Launch"
          data={nextLaunchData}
          isLoading={isNextLaunchFetching}
        ></LaunchCard>
        <LaunchCard
          title="Previous Launch"
          data={latestLaunchData}
          isLoading={isLatestLaunchFetching}
        ></LaunchCard>
        {/* TODO Implement Facilities and Starlink */}
        {/* <Card title="Facilities"></Card>
        <Card title="Starlink"></Card> */}
      </Grid>
      <div style={{ margin: '2rem auto 0' }}>
        <h3>Upcoming Launches</h3>
        {upcomingLaunches?.docs?.map((launch) => (
          <LaunchesItemCard
            data={launch}
            key={launch.id}
            isLoading={isFiveUpcomingLaunchesFetching}
          />
        ))}
        <Button variant="primary" onClick={onButtonClick} text="Show Launches" />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
