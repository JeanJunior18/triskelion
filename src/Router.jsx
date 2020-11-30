import React from 'react';
import { BrowserRouter, Switch ,Route, Redirect } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { isAuthenticated } from './services/auth';
import Products from './pages/views/Products';

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
        <PrivateRoute exact path="/produtos" component={Products} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;