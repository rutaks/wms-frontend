import React from 'react';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
