import React from 'react';
import ReactDOM from 'react-dom';
import { MainPage } from './pages/MainPage';
import { TcpStateProvider } from './context';

/**
 * The root component of the application.
 */
ReactDOM.render(
  <React.StrictMode>
    <TcpStateProvider initial="closed">
      <MainPage />
    </TcpStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
