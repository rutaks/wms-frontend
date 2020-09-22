import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingLayout from '../layouts/LoadingLayout';
import pages from './pages';

const Login = lazy(() => import('../views/Login'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingLayout />}>
      <Switch>
        <Route path={pages.login.url} name={pages.login.name} component={Login} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
