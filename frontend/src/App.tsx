import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import './components/DatePicker/module.css';
import AppProvider from './context/index';
import ThemeContainer from './context/theme/ThemeContainer';
import Routes from './routes';
import GlobaStyle from './styles/global';

function App() {
  return (
    <Router>
      <ThemeContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeContainer>
      <GlobaStyle />
    </Router>
  );
}

export default App;
