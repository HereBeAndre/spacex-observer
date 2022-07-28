import { useFetchedData, usePostData } from 'hooks/useHttpReqData';
import { ILaunch, ILaunchQuery } from 'schemas/launch_d';

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
