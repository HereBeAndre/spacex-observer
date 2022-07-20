export const BASE_URL = 'https://api.spacexdata.com/';

export enum ApiVersion {
  V4 = 'v4',
  V5 = 'v5',
}

export enum ApiEndpoints {
  NEXT_LAUNCH = 'launches/next',
  LATEST_LAUNCH = 'launches/LATEST',
  QUERY_UPCOMING_LAUNCHES = 'launches/query',
  UPCOMING_LAUNCHES = 'launches/upcoming',
}
