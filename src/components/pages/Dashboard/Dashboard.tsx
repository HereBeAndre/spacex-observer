import React from 'react';
// import { useQueryClient } from 'react-query';
import { RouteComponentProps } from '@reach/router';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import Card from 'components/shared/Card/Card';

import './Dashboard.scss';
import Grid from 'components/layout/Grid/Grid';
import LaunchCard from 'components/shared/LaunchCard/LaunchCard';
import { getLatestLaunch, getNextLaunch } from 'api';

const Dashboard = (props: RouteComponentProps) => {
  // TODO: May be useless?
  // const queryClient = useQueryClient();

  // TODO: Use metadata from response in file
  const { status, data: nextLaunchData, error, isFetching } = getNextLaunch();

  // TODO: Use metadata from response in file
  const { data: latestLaunchData } = getLatestLaunch();

  return (
    <MainLayout>
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
