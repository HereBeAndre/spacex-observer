import React from 'react';
// import { useQueryClient } from 'react-query';
import { RouteComponentProps } from '@reach/router';

import { getLatestLaunch, getNextLaunch } from 'api';

import Grid from 'components/layout/Grid/Grid';
import LaunchCard from 'components/shared/LaunchCard/LaunchCard';
import MainLayout from 'components/layout/MainLayout/MainLayout';
import Card from 'components/shared/Card/Card';
import Countdown from 'components/shared/Countdown/Countdown';

import { getNestedObjectPropertyByPathName } from 'utils/functions';

import './Dashboard.scss';

// TODO! Prevent react-query from fetching same data over and over on Dashboard re-render

const Dashboard = (props: RouteComponentProps) => {
  // TODO: May be useless?
  // const queryClient = useQueryClient();

  // TODO: Use metadata from response in file
  const { status, data: nextLaunchData, error, isFetching } = getNextLaunch();

  // TODO: Use metadata from response in file
  const { data: latestLaunchData } = getLatestLaunch();

  return (
    <MainLayout>
      <Countdown
        unixTime={getNestedObjectPropertyByPathName(nextLaunchData, ['date_unix'])}
        isLoading={isFetching}
      />
      <Grid>
        <LaunchCard title="Next Launch" data={nextLaunchData}></LaunchCard>
        <LaunchCard title="Previous Launch" data={latestLaunchData}></LaunchCard>
        <Card title="Facilities"></Card>
        <Card title="Starlink"></Card>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
