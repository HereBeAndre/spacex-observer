import React, { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { Moment } from 'moment';

import { RadioChangeEvent } from 'antd';

import { ApiEndpoints, BASE_URL } from 'api/urls';
import { ILaunchQuery } from 'schemas/launch_d';

import MainLayout from 'components/layout/MainLayout/MainLayout';
import LaunchesItemCard from 'components/shared/LaunchesItemCard/LaunchesItemCard';
import ScrollTop from 'components/shared/buttons/ScrollTop/ScrollTop';
import { navigateTo } from 'components/routes/routes';
import RadioGroup from 'components/shared/buttons/RadioGroup/RadioGroup';
import Dropdown from 'components/shared/buttons/Dropdown/Dropdown';
import LaunchForm from 'components/shared/forms/LaunchForm';

import {
  isEveryArgsTruthy,
  conditionalRender,
  getNestedObjectPropertyByPathName,
  momentToISOString,
  throwError,
  isSomeArgsTruthy,
} from 'utils/functions';
import { LAUNCHES_TYPE_OPTIONS, SORT_OPTIONS } from 'utils/constants';

const Launches = (props: RouteComponentProps) => {
  const { ref, inView } = useInView();

  const [launchType, setLaunchType] = useState<string>(() =>
    getNestedObjectPropertyByPathName(LAUNCHES_TYPE_OPTIONS, ['0', 'value']),
  );
  const [sortValue, setSortValue] = useState<string>(() =>
    getNestedObjectPropertyByPathName(SORT_OPTIONS, ['0', 'value']),
  );
  const [launchDateRange, setLaunchDateRange] = useState<[Moment | null, Moment | null]>(() => [
    null,
    null,
  ]);

  const onSortChange = ({ target: { value } }: RadioChangeEvent) => setSortValue(value);

  const handleDropdownChange = (value: string) => setLaunchType(value);

  const onFormSubmit = (data: FieldValues) => {
    const { fromDate, toDate } = data;
    setLaunchDateRange([fromDate, toDate]);
  };

  // TODO Move query in ad hoc file - part of API requests refactoring topic
  const {
    status,
    data,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['launches', sortValue, launchType, launchDateRange],
    async ({ pageParam = 1 }) => {
      const res = await axios.post<ILaunchQuery>(`${BASE_URL}v5/${ApiEndpoints.QUERY_LAUNCHES}`, {
        options: {
          page: pageParam,
          limit: 5,
          sort: {
            flight_number: sortValue,
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
        query: {
          upcoming: launchType === 'upcoming',
          ...(isSomeArgsTruthy(launchDateRange[0], launchDateRange[1]) && {
            date_utc: {
              ...(isEveryArgsTruthy(launchDateRange[0]) && {
                $gte: momentToISOString(launchDateRange[0]),
              }),
              ...(isEveryArgsTruthy(launchDateRange[1]) && {
                $lte: momentToISOString(launchDateRange[1]),
              }),
            },
          }),
        },
      });
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

  // TODO: Implement component which handles isFetching and error metadata in UI, then use it in other components as well
  // SEE HERE https://www.robinwieruch.de/react-higher-order-components/

  if (isError) {
    throwError(error);
  }

  return (
    <MainLayout>
      {/* TODO Title should be part of default page layout */}
      <h3>Launches</h3>
      <Dropdown options={LAUNCHES_TYPE_OPTIONS} handleChange={handleDropdownChange} />
      <RadioGroup options={SORT_OPTIONS} value={sortValue} onChange={onSortChange} />
      <LaunchForm onSubmit={onFormSubmit} />
      {data?.pages?.map((page) => {
        return page?.data?.docs?.map((launch) => (
          <LaunchesItemCard
            data={launch}
            key={launch.id}
            onClick={() => navigateTo(['launches'], launch.id)}
          />
        ));
      })}
      {/* TODO Replace 'Loading...' string with something nicer */}
      {conditionalRender(
        isEveryArgsTruthy(hasNextPage),
        <div ref={ref}>{isFetching && 'Loading...'}</div>,
      )}
      <ScrollTop />
    </MainLayout>
  );
};

export default Launches;
