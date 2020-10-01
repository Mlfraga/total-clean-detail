import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Services from '../pages/Services';
import Service from '../pages/Services/Vitrificação';
import SetCompanyFirstPrices from '../pages/SetCompanyFirstPrices';
const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Login} />
    <Route path='/services' component={Services} isPrivate />
    <Route path='/service/vitrificacao' component={Service} isPrivate />
    <Route path='/set-prices' component={SetCompanyFirstPrices} isPrivate permissions={['MANAGER']} />
  </Switch>
);

export default Routes;
