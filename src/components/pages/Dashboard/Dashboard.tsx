import React from 'react';
// import { useQueryClient } from 'react-query';
import { RouteComponentProps } from '@reach/router';

import { getLatestLaunch, getNextLaunch, getUpcomingLaunches } from 'api';

import Grid from 'components/layout/Grid/Grid';
import LaunchCard from 'components/shared/LaunchCard/LaunchCard';
import MainLayout from 'components/layout/MainLayout/MainLayout';
import Countdown from 'components/shared/Countdown/Countdown';
import LaunchesItemCard from 'components/shared/LaunchesItemCard/LaunchesItemCard';

import { getNestedObjectPropertyByPathName } from 'utils/functions';

import './Dashboard.scss';
import Button from 'components/shared/Button/Button';
import { APP_ROUTES } from 'components/routes/routes';

/* TODO! Prevent react-query from fetching same data over and over on Dashboard re-render
https://tanstack.com/query/v4/docs/guides/important-defaults */

const Dashboard = ({ navigate }: RouteComponentProps) => {
  // TODO: May be useless?
  // const queryClient = useQueryClient();

  // TODO: Use metadata from response in file
  const { status, data: nextLaunchData, error, isFetching } = getNextLaunch();

  // TODO: Use metadata from response in file
  const { data: latestLaunchData } = getLatestLaunch();

  // TODO: Use metadata from response in file
  const { data: upcomingLaunches } = getUpcomingLaunches();

  const onButtonClick = () => navigate!(APP_ROUTES.LAUNCHES);

  return (
    <MainLayout>
      <Countdown
        unixTime={getNestedObjectPropertyByPathName(nextLaunchData, ['date_unix'])}
        isLoading={isFetching}
        hasTitle
      />
      <Grid>
        <LaunchCard title="Next Launch" data={nextLaunchData}></LaunchCard>
        <LaunchCard title="Previous Launch" data={latestLaunchData}></LaunchCard>
        {/* TODO Implement Facilities and Starlink */}
        {/* <Card title="Facilities"></Card>
        <Card title="Starlink"></Card> */}
      </Grid>
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0' }}>
        <h3>Upcoming Launches</h3>
        {upcomingLaunches?.docs?.map((launch) => (
          <LaunchesItemCard data={launch} key={launch.id} />
        ))}
        <Button variant="primary" onClick={onButtonClick} text="Show Launches" />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
