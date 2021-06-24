import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components';

const PrivateRoute = () => {
  return (
    <Fragment>
      <Sidebar>
        <Switch>
          <Route exact path={'/test'}>
            <div></div>
          </Route>
        </Switch>
      </Sidebar>
    </Fragment>
  );
};

export default PrivateRoute;
