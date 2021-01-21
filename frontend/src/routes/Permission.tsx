/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/auth';

interface IRouteProps extends ReactDOMRouteProps {
  permissions?: string[];
  component: React.ComponentType;
}

const Permission: React.FC<IRouteProps> = ({
  permissions = ['MANAGER', 'SELLER', 'ADMIN'],
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() =>
        !user ? (
          <Component />
        ) : permissions.includes(user.role) ? (
          <Component />
        ) : (
          <Redirect to="/services" />
        )
      }
    />
  );
};

export default Permission;
