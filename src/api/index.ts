import { useFetchedData, usePostData } from 'hooks/useFetchedData';
import { ILaunch, ILaunchQuery } from 'schemas/launch_d';
import { ApiEndpoints } from './urls';

export const getNextLaunch = () => useFetchedData<ILaunch>('nextLaunch', ApiEndpoints.NEXT_LAUNCH);

export const getLatestLaunch = () =>
  useFetchedData<ILaunch>('latestLaunch', ApiEndpoints.LATEST_LAUNCH);

export const getUpcomingLaunches = () =>
  usePostData<ILaunchQuery>('fiveUpcomingLaunches', ApiEndpoints.QUERY_UPCOMING_LAUNCHES, {
    query: {
      upcoming: true,
    },
    options: {
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
  });
