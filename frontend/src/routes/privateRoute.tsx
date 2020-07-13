import React from 'react';
import { isAuthenticated } from '../auth/authorization'

import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const history = useHistory();
    return (
        <Route {...rest} render={props => (
            isAuthenticated() ? (
                < Component {...props} />
            ) : (
                    history.push('/login', { state: { from: props.location } })
                )
        )} />
    );
}

export default PrivateRoute;