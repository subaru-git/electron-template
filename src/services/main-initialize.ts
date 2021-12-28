import { ipcMain, BrowserWindow } from 'electron';
import { TcpClient } from './tcp-client';

/**
 * Initialize for the main process.
 *
 * @param window browser window
 */
const initialize = (window: BrowserWindow) => {
  const tcpClient = new TcpClient(window);
  ipcMain.on('tcp-listen', (event, host, port) => {
    tcpClient.listen(host, port);
  });
  ipcMain.on('tcp-close', () => {
    tcpClient.close();
  });
};

export { initialize };
