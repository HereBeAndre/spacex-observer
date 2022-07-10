import React from 'react';
import { useQueryClient } from 'react-query';
import { RouteComponentProps } from '@reach/router';

import useFetchedData from 'hooks/useFetchedData';
import { ApiUrls } from 'api/urls';
import { ILaunch } from 'schemas/launch_d';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import Card from 'components/shared/Card/Card';

import './Dashboard.scss';
import Grid from 'components/layout/Grid/Grid';
import LaunchCard from 'components/shared/LaunchCard/LaunchCard';

const Dashboard = (props: RouteComponentProps) => {
  const queryClient = useQueryClient();

  // TODO: Use metadata from response
  const { status, data, error, isFetching } = useFetchedData<ILaunch>(
    'nextLaunch',
    ApiUrls.NEXT_LAUNCH,
  );

  return (
    <MainLayout>
      <Grid>
        <LaunchCard title="Next Launch" data={data}></LaunchCard>
        <Card title="Upcoming Launches"></Card>
        <Card title="Facilities"></Card>
        <Card title="Starlink"></Card>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
