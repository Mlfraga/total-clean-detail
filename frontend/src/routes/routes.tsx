import React, { useState } from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import Login from '../pages/Login';
import Services from '../pages/Services';
import Vitrificacao from '../pages/Services/Vitrificação';
import SetPrices from '../pages/SetCompanyFirstPrices';
import Header from '../components/Header';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/serviços' component={Services}></PrivateRoute>
        <PrivateRoute path='/serviço/vitrificacao' component={Vitrificacao} ></PrivateRoute>
        <PrivateRoute path='/configurar-precos' component={SetPrices} ></PrivateRoute>
      </Switch>
    </BrowserRouter >
  );
}

export default Routes;
