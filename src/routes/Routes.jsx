import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingLayout from '../layouts/LoadingLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import pages from './pages';

const Login = lazy(() => import('../views/Login'));
const ForgotPassword = lazy(() => import('../views/ForgotPassword'));
const ResetPassword = lazy(() => import('../views/ResetPassword'));
const ConfimClientAccount = lazy(() => import('../views/ConfimClientAccount'));
const ReportIssue = lazy(() => import('../views/ReportIssue'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingLayout />}>
      <Switch>
        <Route exact path={pages.login.url} name={pages.login.name} component={Login} />
        <Route exact path={'/report-issue'} name={'Report Issue'} component={ReportIssue} />
        <Route exact path={'/forgot-password'} name={'Forgot Password'} component={ForgotPassword} />
        <Route exact path={'/forgot-password/:token'} name={'Reset Password'} component={ResetPassword} />
        <Route
          exact
          path={'/clients/confirm-account/:token'}
          name={'Client Password Confirmation'}
          component={ConfimClientAccount}
        />
        <PrivateRoute />
      </Switch>
    </Suspense>
  );
};

export default Routes;
