import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components';
import ClientsView from '../../../views/ClientsView/ClientsView';
import CreateClientView from '../../../views/CreateClientView';

const PrivateRoute = () => {
  return (
    <Fragment>
      <Sidebar>
        <Switch>
          <Route exact path={'/test'}>
            <div></div>
          </Route>
          <Route exact path={'/clients'}>
            <ClientsView />
          </Route>
          <Route exact path={'/clients/new'}>
            <CreateClientView />
          </Route>
        </Switch>
      </Sidebar>
    </Fragment>
  );
};

export default PrivateRoute;
