import { useFetchedData, usePostData } from 'hooks/useHttpReqData';
import { ILaunch, ILaunchQuery } from 'schemas/launch_d';
import { ApiEndpoints } from './urls';

export const getLaunch = (key: string, url: string) => useFetchedData<ILaunch>(key, url);

type TQueryKey = 'query' | 'options';

type TQueryObject<T> = Record<TQueryKey, T>;

export const postLaunchesQuery = <T>(
  key: string,
  url: string,
  { query, options }: TQueryObject<T>,
) =>
  usePostData<ILaunchQuery>(key, url, {
    query,
    options,
  });

export const getFiveUpcomingLaunches = () =>
  postLaunchesQuery('fiveUpcomingLaunches', ApiEndpoints.QUERY_UPCOMING_LAUNCHES, {
    query: { upcoming: true },
    options: {
      limit: 5,
      sort: {
        flight_number: 'asc',
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
  });
