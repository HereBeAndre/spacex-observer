import React, { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';

import { ApiEndpoints, BASE_URL } from 'api/urls';
import { ILaunchQuery } from 'schemas/launch_d';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import LaunchesItemCard from 'components/shared/LaunchesItemCard/LaunchesItemCard';

// TODO Refactor component

const Launches = (props: RouteComponentProps) => {
  const { ref, inView } = useInView();

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
      {data?.pages?.map((page) => {
        return page?.data?.docs?.map((launch) => (
          <LaunchesItemCard data={launch} key={launch.id} />
        ));
      })}
      <button
        style={{ cursor: !hasNextPage || isFetchingNextPage ? 'not-allowed' : 'pointer' }}
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Fetch more
      </button>
    </MainLayout>
  );
};

export default Launches;
