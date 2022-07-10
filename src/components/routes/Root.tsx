import React from 'react';
import { Router } from '@reach/router';

import Launches from 'components/pages/Launches';
import Dashboard from 'components/pages/Dashboard/Dashboard';
import { APP_ROUTES } from './routes';

const Root = () => (
  <Router>
    <Dashboard path={APP_ROUTES.DASHBOARD} />
    <Launches path={APP_ROUTES.LAUNCHES} />
  </Router>
);

export default Root;
