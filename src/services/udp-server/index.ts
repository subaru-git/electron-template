import { BrowserWindow } from 'electron';
import dgram from 'dgram';

/**
 * This class is used to manage the UDP server.
 * And manages browser window for sending messages to the renderer process.
 */
class UdpServer {
  /** browser window */
  private window: BrowserWindow;
  /** UDP server */
  private server: dgram.Socket;

  /**
   * Constructor.
   *
   * @param window browser window
   */
  constructor(window: BrowserWindow) {
    this.window = window;
    this.server = dgram.createSocket('udp4');
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });
    this.server.on('error', (error) => {
      console.log(`server error:\n${error.stack}`);
      this.server.close();
    });
    this.server.on('message', (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      this.window.webContents.send(
        'tcp-message',
        `${rinfo.address}:${rinfo.port} ${msg}`
      );
    });
  }

  /**
   * Start the UDP server.
   *
   * @param port The port to listen to.
   */
  listen = async (port: number) => {
    this.server.bind(port, () => {
      console.log(`server started at ${port}`);
      // this.window.webContents.send('tcp-connection-state-change', 'listening');
    });
  };

  /**
   * Close the UDP server.
   */
  close = () => {
    this.server.close();
  };
}
export { UdpServer };
