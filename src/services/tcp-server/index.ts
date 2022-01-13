import { BrowserWindow } from 'electron';
import * as net from 'net';
import log from 'electron-log';
import ElectronStore from 'electron-store';
const store = new ElectronStore();

/**
 * This class is used to manage the TCP server.
 * And manages browser window for sending messages to the renderer process.
 */
class TcpServer {
  /** browser window */
  private window: BrowserWindow;
  /** TCP server */
  private server: net.Server;
  /** connected clients */
  private clients: net.Socket[] = [];

  /**
   * Constructor.
   *
   * @param window browser window
   */
  constructor(window: BrowserWindow) {
    this.window = window;
    this.server = net.createServer((socket) => {
      this.window.webContents.send(
        'tcp-message',
        `${socket.remoteAddress}:${socket.remotePort} Connected`
      );
      log.info(`${socket.remoteAddress}:${socket.remotePort} Connected`);
      this.clients.push(socket);
      socket.write('client connected\n');
      socket.on('data', (data) => {
        const message = `${data}`.replace(/\r?\n/g, '');
        socket.write(`you say: ${message}\n`);
        this.window.webContents.send(
          'tcp-message',
          `${socket.remoteAddress}:${socket.remotePort} ${message}`
        );
        log.info(`${socket.remoteAddress}:${socket.remotePort} ${message}`);
      });
      socket.on('close', () => {
        this.window.webContents.send(
          'tcp-message',
          `${socket.remoteAddress}:${socket.remotePort} Terminated the connection`
        );
        log.info(
          `${socket.remoteAddress}:${socket.remotePort} Terminated the connection`
        );
        this.clients.splice(this.clients.indexOf(socket), 1);
      });
      socket.on('error', (error) => {
        log.error(
          `${socket.remoteAddress}:${socket.remotePort} Connection Error ${error}`
        );
        this.window.webContents.send(
          'tcp-message',
          `${socket.remoteAddress}:${socket.remotePort} Connection Error ${error}`
        );
      });
    });
  }

  /**
   * Start the TCP server.
   *
   * @param host The host to listen to.
   * @param port The port to listen to.
   */
  listen = async (host: string, port: number) => {
    store.set('tcp-server.host', host);
    store.set('tcp-server.port', port);
    this.server.listen(port, host, () => {
      this.window.webContents.send('tcp-connection-state-change', 'listening');
      this.window.webContents.send(
        'tcp-message',
        `TCP server started at ${port}`
      );
      log.info(`TCP server started at ${host}:${port}`);
    });
  };

  /**
   * Close the TCP server.
   */
  close = () => {
    if (this.server.listening) {
      this.clients.forEach((client) => {
        client.write(`disconnected from server\n`);
        client.destroy();
      });
      this.server.close(() => {
        this.window.webContents.send('tcp-connection-state-change', 'closed');
        this.window.webContents.send('tcp-message', `TCP server closed`);
        log.info(`TCP server closed`);
      });
    }
  };

  /**
   * TCP settings request.
   * This request is sent from the renderer process.
   * And the response is sent to the renderer process.
   */
  settingsRequest = () => {
    const host = store.get('tcp-server.host') ?? '';
    const port = store.get('tcp-server.port') ?? '';
    this.window.webContents.send('tcp-settings-response', host, port);
  };
}
export { TcpServer };
