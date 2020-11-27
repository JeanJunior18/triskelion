import React from 'react';
import { BrowserRouter, Switch ,Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;