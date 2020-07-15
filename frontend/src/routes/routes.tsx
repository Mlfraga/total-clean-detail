import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import Login from '../pages/Login';
import Services from '../pages/Services';
import Service from '../pages/Services/Vitrificação';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={Login} />
                <PrivateRoute path='/serviços' component={Services}></PrivateRoute>
                <PrivateRoute path='/serviço/vitrificacao' component={Service} ></PrivateRoute>
            </Switch>
        </BrowserRouter >
    );
}

export default Routes;