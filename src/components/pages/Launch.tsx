import React from 'react';
import { RouteComponentProps } from '@reach/router';

import MainLayout from 'components/layout/MainLayout/MainLayout';

const Launch = (props: RouteComponentProps) => {
  return (
    <MainLayout>
      <h1>Launch view</h1>
    </MainLayout>
  );
};

export default Launch;
