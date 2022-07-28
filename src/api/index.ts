import { useFetchedData, usePostData } from 'hooks/useFetchedData';
import { ILaunch, ILaunchQuery } from 'schemas/launch_d';

// TODO TECH-DEBT https://www.delftstack.com/howto/typescript/axios-typescript/

export const getLaunch = (key: string, endpoint: string) => useFetchedData<ILaunch>(key, endpoint);

type TQueryKey = 'query' | 'options';

type TQueryObject<T> = Record<TQueryKey, T>;

export const postLaunchesQuery = <T>(
  key: string,
  endpoint: string,
  { query, options }: TQueryObject<T>,
) =>
  usePostData<ILaunchQuery>(key, endpoint, {
    query,
    options,
  });
