import React from 'react';
import { Router } from '@reach/router';

import Launches from 'components/pages/Launches';
import Dashboard from 'components/pages/Dashboard';
import { AppRoutes } from './urls';

const Root = () => (
  <Router>
    <Dashboard path={AppRoutes.DASHBOARD} />
    <Launches path={AppRoutes.LAUNCHES} />
  </Router>
);

export default Root;
