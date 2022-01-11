import { ipcMain, BrowserWindow } from 'electron';
import { TcpServer } from './tcp-server';

/**
 * Initialize for the main process.
 *
 * @param window browser window
 */
const initialize = (window: BrowserWindow) => {
  const tcpServer = new TcpServer(window);
  ipcMain.on('tcp-listen', (event, host, port) => {
    tcpServer.listen(host, port);
  });
  ipcMain.on('tcp-close', () => {
    tcpServer.close();
  });
};

export { initialize };
