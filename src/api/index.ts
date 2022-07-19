import useFetchedData from 'hooks/useFetchedData';
import { ILaunch } from 'schemas/launch_d';
import { ApiEndpoints } from './urls';

export const getNextLaunch = () => useFetchedData<ILaunch>('nextLaunch', ApiEndpoints.NEXT_LAUNCH);

export const getLatestLaunch = () =>
  useFetchedData<ILaunch>('latestLaunch', ApiEndpoints.LATEST_LAUNCH);

export const getUpcomingLaunches = () =>
  useFetchedData<ILaunch[]>('upcomingLaunches', ApiEndpoints.UPCOMING_LAUNCHES);
