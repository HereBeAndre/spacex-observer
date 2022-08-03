import React from 'react';
import { Router } from '@reach/router';

import Launches from 'components/pages/Launches';
import Dashboard from 'components/pages/Dashboard/Dashboard';
import Launch from 'components/pages/Launch';

import { APP_ROUTES } from './routes';

const Root = () => (
  <Router>
    <Dashboard path={APP_ROUTES.dashboard} />
    <Launch path={APP_ROUTES.launch} />
    <Launches path={APP_ROUTES.launches} />
  </Router>
);

export default Root;
