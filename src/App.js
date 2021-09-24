import React from 'react';
import './App.less';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import ApiProvider from './context/Api/ApiProvider';
import AuthProvider from './context/Auth/AuthProvider';
import { backend } from './helpers/urlHelper';

function App() {
  return (
    <LoadScript googleMapsApiKey={backend.googleMapApiKey} libraries={['places', 'drawing']}>
      <ApiProvider>
        <AuthProvider>
          <Router>
            <Routes />
          </Router>
        </AuthProvider>
      </ApiProvider>
    </LoadScript>
  );
}

export default App;
