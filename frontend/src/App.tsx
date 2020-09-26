import React from 'react';

import Login from './pages/Login';
import Header from './components/Header';
import GlobaStyle from './styles/global'

import { AuthProvider } from './context/AuthContext';
// import Routes from './routes/routes';

function App() {
  return (
    <>
      <AuthProvider>
        <Login />
      </AuthProvider>

      <GlobaStyle />
    </>
  );
}

export default App;
