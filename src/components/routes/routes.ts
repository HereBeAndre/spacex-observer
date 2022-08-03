import { navigate } from '@reach/router';
import { buildUrl, toString } from 'utils/functions';

export const APP_ROUTES = {
  dashboard: '/',
  launch: '/launches/:launchId',
  launches: '/launches',
};

export const NAVBAR_ROUTES = {
  dashboard: APP_ROUTES.dashboard,
  launches: APP_ROUTES.launches,
};

// If an id is passed in, this will be then passed to buildUrl() as well.
// If no id is provided, the path array passed to buildUrl() will only contain the path, not the id
export const navigateTo = (path: string[], id?: string | number) =>
  navigate!(buildUrl([...path, ...(id ? [toString(id)] : [])]));
