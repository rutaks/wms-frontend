import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components';
import ClientsView from '../../../views/ClientsView/ClientsView';
import CreateClientView from '../../../views/CreateClientView';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../context/Auth/useAuth';
import ClientDetails from '../../../views/ClientDetails';
import AgentsView from '../../../views/AgentsView';
import CreateAgentView from '../../../views/CreateAgentView/CreateAgentView';
import ReportsView from '../../../views/ReportsView';
import DevicesView from '../../../views/DevicesView';
import BillingView from '../../../views/BillingView';
import IssuesView from '../../../views/IssuesView/IssuesView';

const PrivateRoute = () => {
  const router = useHistory();
  const auth = useAuth();

  useEffect(() => {
    if (auth.loaded && !auth.loggedIn) {
      router.replace('/login');
    }
  }, [auth, router]);

  if (!auth.loaded) {
    return null;
  }

  return (
    <Fragment>
      <Sidebar>
        <Switch>
          <Route exact path={'/issues'}>
            <IssuesView />
          </Route>
          <Route exact path={'/clients'}>
            <ClientsView />
          </Route>
          <Route exact path={'/clients/new'}>
            <CreateClientView />
          </Route>
          <Route exact path={'/clients/:clientUuid'}>
            <ClientDetails />
          </Route>
          <Route exact path={'/employees'}>
            <AgentsView />
          </Route>
          <Route exact path={'/employees/new'}>
            <CreateAgentView />
          </Route>
          <Route exact path={'/reports'}>
            <ReportsView />
          </Route>
          <Route exact path={'/devices'}>
            <DevicesView />
          </Route>
          <Route exact path={'/bills'}>
            <BillingView />
          </Route>
        </Switch>
      </Sidebar>
    </Fragment>
  );
};

export default PrivateRoute;
