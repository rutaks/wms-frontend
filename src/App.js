import React from 'react';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import ApiProvider from './context/Api/ApiProvider';
import AuthProvider from './context/Auth/AuthProvider';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
