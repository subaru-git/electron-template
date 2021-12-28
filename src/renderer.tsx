import React from 'react';
import ReactDOM from 'react-dom';
import { MainPage } from './pages/MainPage';
import { TcpStateProvider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The root component of the application.
 */
ReactDOM.render(
  <React.StrictMode>
    <TcpStateProvider>
      <MainPage />
    </TcpStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
