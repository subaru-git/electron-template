import { BrowserWindow } from 'electron';
import * as net from 'net';

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
      console.log(`${socket.remoteAddress}:${socket.remotePort} Connected`);
      this.window.webContents.send(
        'tcp-message',
        `${socket.remoteAddress}:${socket.remotePort} Connected`
      );
      this.clients.push(socket);
      socket.write('client connected\n');
      socket.on('data', (data) => {
        console.log(
          `${socket.remoteAddress}:${socket.remotePort} Says: ${data}`
        );
        const message = `${data}`.replace(/\r?\n/g, '');
        socket.write(`${message} www\n`);
        this.window.webContents.send(
          'tcp-message',
          `${socket.remoteAddress}:${socket.remotePort} ${message}`
        );
      });
      socket.on('close', () => {
        console.log(
          `${socket.remoteAddress}:${socket.remotePort} Terminated the connection`
        );
        this.window.webContents.send(
          'tcp-message',
          `${socket.remoteAddress}:${socket.remotePort} Terminated the connection`
        );
        this.clients.splice(this.clients.indexOf(socket), 1);
      });
      socket.on('error', (error) => {
        console.error(
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
    this.server.listen(port, host, () => {
      console.log(`server started at ${host}:${port}`);
      this.window.webContents.send('tcp-connection-state-change', 'listening');
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
        console.log('server closed');
        this.window.webContents.send('tcp-connection-state-change', 'closed');
      });
    }
  };
}
export { TcpServer };
