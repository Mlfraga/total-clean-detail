import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Services from '../pages/Services';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Login} />
    <Route path='/services' component={Services} isPrivate />
  </Switch>
);

export default Routes;
