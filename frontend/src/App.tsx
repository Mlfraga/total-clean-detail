import React from 'react';

import Login from './pages/Login';
import Header from './components/Header';
import GlobaStyle from './styles/global'

import AppProvider from './context/index';
// import Routes from './routes/routes';

function App() {
  return (
    <>
      <AppProvider>
        <Login />
      </AppProvider>

      <GlobaStyle />
    </>
  );
}

export default App;
