import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import { postLaunchesQuery } from 'api';
import { ApiEndpoints } from 'api/urls';
import { getNestedObjectPropertyByPathName } from 'utils/functions';

// launchId URL parameter is parsed to prop in Launch.tsx by reach-router - see Root.tsx
interface ILaunchProps extends RouteComponentProps {
  launchId?: string;
}

const Launch: FunctionComponent<ILaunchProps> = ({ launchId }) => {
  const { data, isLoading } = postLaunchesQuery(
    `LAUNCH #${launchId}`,
    ApiEndpoints.QUERY_LAUNCHES,
    {
      options: {
        limit: 1,
      },
      query: {
        _id: launchId,
      },
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <h3>{getNestedObjectPropertyByPathName(data, ['docs', '0', 'name'])}</h3>
    </MainLayout>
  );
};

export default Launch;
