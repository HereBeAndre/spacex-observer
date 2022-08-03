import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, ApiVersion } from 'api/urls';
import { buildUrl } from 'utils/functions';

const instance = axios.create({
  baseURL: BASE_URL,
});

// TECH-DEBT Not DRY
// https://www.delftstack.com/howto/typescript/axios-typescript/

// START ~ react-query hooks
function useFetchedData<T>(
  key: string,
  url: string,
  apiVersion: ApiVersion.V4 | ApiVersion.V5 = ApiVersion.V5,
): UseQueryResult<T> {
  return useQuery([key], async () => {
    const { data } = await instance.get(buildUrl([apiVersion, url]));
    return data;
  });
}

function usePostData<T>(
  key: string,
  url: string,
  payload: any,
  apiVersion: string = ApiVersion.V5,
): UseQueryResult<T> {
  return useQuery([key], async () => {
    const { data } = await instance.post(buildUrl([apiVersion, url]), payload);
    return data;
  });
}
// END ~ react-query hooks

export { useFetchedData, usePostData };
