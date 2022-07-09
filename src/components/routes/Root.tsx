import React from 'react';
import { Router } from '@reach/router';
import Launches from 'components/pages/Launches';
import { AppRoutes } from './urls';

const Root = () => (
  <Router>
    <Launches path={AppRoutes.LAUNCHES} />
  </Router>
);

export default Root;
