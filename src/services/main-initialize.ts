import { ipcMain, BrowserWindow } from 'electron';
import { TcpServer } from './tcp-server';
import { UdpServer } from './udp-server';

/**
 * Initialize for the main process.
 *
 * @param window browser window
 */
const initialize = (window: BrowserWindow) => {
  const tcpServer = new TcpServer(window);
  const udpServer = new UdpServer(window);
  ipcMain.on('tcp-listen', async (event, host, port) => {
    await tcpServer.listen(host, port);
    await udpServer.listen(port);
  });
  ipcMain.on('tcp-close', () => {
    tcpServer.close();
    udpServer.close();
  });
};

export { initialize };
