import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import Permission from './Permission';

import { useAuth } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  permissions?: string[];
}

const Route: React.FC<RouteProps> = ({
  permissions,
  isPrivate = false,
  component: Component,
  ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Permission permissions={permissions} component={Component} />
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/' : 'services',
              state: { from: location }
            }} />
          )
      }}
    />
  )
}

export default Route;

