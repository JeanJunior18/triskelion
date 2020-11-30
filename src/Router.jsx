import React from 'react';
import { BrowserRouter, Switch ,Route, Redirect } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={ props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )}

  />
)

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;