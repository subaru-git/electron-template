import { BrowserWindow } from 'electron';
import dgram from 'dgram';
import log from 'electron-log';

/**
 * This class is used to manage the UDP server.
 * And manages browser window for sending messages to the renderer process.
 */
class UdpServer {
  /** browser window */
  private window: BrowserWindow;
  /** UDP server */
  private server: dgram.Socket | null;

  /**
   * Constructor.
   *
   * @param window browser window
   */
  constructor(window: BrowserWindow) {
    this.window = window;
    this.server = null;
  }

  /**
   * Start the UDP server.
   * The server needs to create a new UDP socket for listening.
   *
   * @param port The port to listen to.
   */
  listen = async (port: number) => {
    this.createServer();
    this.server?.bind(port, () => {
      log.info(`UDP server started at ${port}`);
      this.window.webContents.send(
        'tcp-message',
        `UDP server started at ${port}`
      );
    });
  };

  /**
   * Close the UDP server.
   */
  close = () => {
    this.server?.close();
    this.server = null;
  };

  private createServer = () => {
    if (this.server !== null) return;

    this.server = dgram.createSocket('udp4');
    this.server.on('listening', () => {
      if (this.server === null) return;
      const { address, port } = this.server.address();
      log.info(`UDP server listening ${address}:${port}`);
    });
    this.server.on('error', (error) => {
      log.error(`server error:\n${error.stack}`);
      if (this.server === null) return;
      const { address, port } = this.server.address();
      this.window.webContents.send(
        'tcp-message',
        `${address}:${port} UDP server error:\n${error.stack}`
      );
      this.server.close();
    });
    this.server.on('message', (msg, rinfo) => {
      log.info(`${rinfo.address}:${rinfo.port} ${msg}`);
      this.window.webContents.send(
        'tcp-message',
        `${rinfo.address}:${rinfo.port} ${msg}`
      );
      this.server?.send(msg, rinfo.port, rinfo.address);
    });
    this.server.on('close', () => {
      this.window.webContents.send('tcp-message', `UDP server closed`);
      log.info(`UDP server closed`);
    });
  };
}
export { UdpServer };
