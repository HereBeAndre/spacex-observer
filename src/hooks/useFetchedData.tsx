import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { BASE_URL, ApiVersion } from 'api/urls';

// TODO! No DRY - Refactor functions below

// START ~ react-query hooks
function useFetchedData<T>(
  key: string,
  endpoint: string,
  apiVersion: string = ApiVersion.V5,
): UseQueryResult<T> {
  return useQuery([key], async () => {
    // TODO: Build URL with proper method?
    const { data } = await axios.get(`${BASE_URL}${apiVersion}/${endpoint}`);
    return data;
  });
}

function usePostData<T>(
  key: string,
  endpoint: string,
  payload: any,
  apiVersion: string = ApiVersion.V5,
): UseQueryResult<T> {
  return useQuery([key], async () => {
    // TODO: Build URL with proper method?
    const { data } = await axios.post(`${BASE_URL}${apiVersion}/${endpoint}`, payload);
    return data;
  });
}
// END ~ react-query hooks

export { useFetchedData, usePostData };
