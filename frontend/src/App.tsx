import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobaStyle from './styles/global'

import AppProvider from './context/index';

import Routes from '../src/routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobaStyle />
    </Router >
  );
}

export default App;
