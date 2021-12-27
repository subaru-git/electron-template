import React from 'react';
import ReactDOM from 'react-dom';
import { MainPage } from './pages/MainPage';
import { TcpStateProvider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <TcpStateProvider>
      <MainPage />
    </TcpStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
