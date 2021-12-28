import { ipcMain, BrowserWindow } from 'electron';
import { TcpClient } from './tcp-client';

/**
 * Initialize for the main process.
 *
 * @param window browser window
 */
const initialize = (window: BrowserWindow) => {
  const tcpClient = new TcpClient(window);
  ipcMain.on('tcpConnect', (event, host, port) => {
    tcpClient.connect(host, port);
  });
};

export { initialize };
