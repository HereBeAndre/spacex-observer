import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { BASE_URL } from 'api/urls';

// START ~ react-query hooks
function useFetchedData<T>(key: string, endpoint: string): UseQueryResult<T> {
  return useQuery([key], async () => {
    const { data } = await axios.get(`${BASE_URL}${endpoint}`);
    return data;
  });
}
// END ~ react-query hooks

export default useFetchedData;
