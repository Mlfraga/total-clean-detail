import React from 'react';
import { isAuthenticated } from '../auth/authorization'

import { Route, useHistory, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const history = useHistory();
  return (
    <Route {...rest} render={props => (
      isAuthenticated() ? (
        < Component {...props} />
      ) :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  );
}

export default PrivateRoute;
