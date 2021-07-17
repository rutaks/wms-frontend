import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingLayout from '../layouts/LoadingLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import pages from './pages';

const Login = lazy(() => import('../views/Login'));
const ForgotPassword = lazy(() => import('../views/ForgotPassword'));
const ResetPassword = lazy(() => import('../views/ResetPassword'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingLayout />}>
      <Switch>
        <Route exact path={pages.login.url} name={pages.login.name} component={Login} />
        <Route exact path={'/forgot-password'} name={'Forgot Password'} component={ForgotPassword} />
        <Route exact path={'/forgot-password/:token'} name={'Reset Password'} component={ResetPassword} />
        <PrivateRoute />
      </Switch>
    </Suspense>
  );
};

export default Routes;
