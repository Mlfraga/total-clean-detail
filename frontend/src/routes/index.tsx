import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Services from '../pages/Services';
import Service from '../pages/Services/Vitrificação';
import SetCompanyFirstPrices from '../pages/SetCompanyFirstPrices';
import SalesRegister from '../pages/SalesRegister';
import Sellers from '../pages/Sellers';
import SellersRegister from '../pages/SellersRegisater';
import Sales from '../pages/Sales';
import Companies from '../pages/Companies';
import AlertDevelopingPage from '../pages/AlertDevelopingPage';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Login} />
    <Route path='/services' component={Services} isPrivate />
    <Route path='/service/vitrificacao' component={Service} isPrivate />
    <Route path='/set-prices' component={SetCompanyFirstPrices} isPrivate permissions={['MANAGER']} />
    <Route path='/sales-register' component={SalesRegister} isPrivate permissions={['MANAGER', 'SELLER']} />
    <Route path='/sellers' component={Sellers} isPrivate permissions={['MANAGER']} />
    <Route path='/sellers-register' component={SellersRegister} isPrivate permissions={['MANAGER']} />
    <Route path='/sales' component={Sales} isPrivate permissions={['MANAGER', 'SELLER', 'ADMIN']} />
    <Route path='/reports' component={AlertDevelopingPage} isPrivate permissions={['MANAGER']} />
    <Route path='/prices' component={AlertDevelopingPage} isPrivate permissions={['MANAGER']} />
    <Route path='/companies' component={Companies} isPrivate permissions={['ADMIN']} />
  </Switch>
);

export default Routes;
