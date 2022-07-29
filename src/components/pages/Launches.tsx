import React, { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';

import { ApiEndpoints, BASE_URL } from 'api/urls';
import { ILaunchQuery } from 'schemas/launch_d';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import LaunchesItemCard from 'components/shared/LaunchesItemCard/LaunchesItemCard';

import { areArgsTruthy } from 'utils/functions';

// TODO: Implement component which handles isFetching and error metadata, then use it in other components

const Launches = (props: RouteComponentProps) => {
  const { ref, inView } = useInView();

  // TODO Move query in ad hoc file - part of API requests refactoring topic
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['launches'],
    async ({ pageParam = 1 }) => {
      const res = await axios.post<ILaunchQuery>(
        `${BASE_URL}v5/${ApiEndpoints.QUERY_UPCOMING_LAUNCHES}`,
        {
          options: {
            page: pageParam,
            limit: 5,
            sort: {
              date_unix: 'asc',
            },
            populate: [
              {
                path: 'rocket',
                select: { name: 1 },
              },
              {
                path: 'launchpad',
                select: { name: 1 },
              },
            ],
          },
        },
      );
      return res;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.data.prevPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage.data.nextPage ?? undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <MainLayout>
      {/* TODO Title should be part of default page layout */}
      <h3>Launches</h3>
      {data?.pages?.map((page) => {
        return page?.data?.docs?.map((launch) => (
          <LaunchesItemCard data={launch} key={launch.id} />
        ));
      })}
      {/* TODO Replace 'Loading...' string with something nicer */}
      {areArgsTruthy(hasNextPage) ? <div ref={ref}>{isFetching && 'Loading...'}</div> : null}
    </MainLayout>
  );
};

export default Launches;
