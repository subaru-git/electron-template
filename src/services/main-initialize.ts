import { ipcMain, BrowserWindow } from 'electron';
import { TcpClient } from './tcp-client';

const initialize = (window: BrowserWindow) => {
  const tcpClient = new TcpClient(window);
  ipcMain.on('tcpConnect', (event, host, port) => {
    tcpClient.connect(host, port);
  });
};

export { initialize };
