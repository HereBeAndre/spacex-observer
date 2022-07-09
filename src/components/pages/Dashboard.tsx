import React from 'react';
import { useQueryClient } from 'react-query';
import { RouteComponentProps } from '@reach/router';

import useFetchedData from 'hooks/useFetchedData';
import { ApiUrls } from 'api/urls';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import Card from 'components/shared/Card/Card';
import { ILaunch } from 'schemas/launch_d';

const Dashboard = (props: RouteComponentProps) => {
  const queryClient = useQueryClient();

  const { status, data, error, isFetching } = useFetchedData<ILaunch>(
    'nextLaunch',
    ApiUrls.NEXT_LAUNCH,
  );

  return (
    <MainLayout>
      <Card title="Next Launch">
        <p>{data?.name}</p>
      </Card>
      {/* <Card>Upcoming Launches</Card> */}
      {/* <Card>Facilities</Card> */}
      {/* <Card>Starlink</Card> */}
    </MainLayout>
  );
};

export default Dashboard;
