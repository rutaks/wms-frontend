import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components';
import ClientsView from '../../../views/ClientsView/ClientsView';
import CreateClientView from '../../../views/CreateClientView';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../context/Auth/useAuth';

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
