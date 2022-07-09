import React from 'react';
import { RouteComponentProps } from '@reach/router';

import MainLayout from 'components/layout/MainLayout/MainLayout';

const Dashboard = (props: RouteComponentProps) => {
  return (
    <MainLayout>
      <h1>Dashboard Page</h1>
    </MainLayout>
  );
};

export default Dashboard;
