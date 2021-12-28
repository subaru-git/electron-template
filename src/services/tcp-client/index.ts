import { BrowserWindow } from 'electron';
import * as net from 'net';

/**
 * This class is used to manage the TCP server.
 * And manages browser window for sending messages to the renderer process.
 */
class TcpClient {
  /** browser window */
  private window: BrowserWindow;

  /**
   * Constructor.
   *
   * @param window browser window
   */
  constructor(window: BrowserWindow) {
    this.window = window;
  }

  /**
   * Start the TCP server.
   *
   * @param host The host to listen to.
   * @param port The port to listen to.
   */
  connect = async (host: string, port: number) => {
    const server = net.createServer((socket) => {
      console.log(`${socket.remoteAddress}:${socket.remotePort} Connected`);
      socket.write('client connected\n');
      socket.on('data', (data) => {
        console.log(
          `${socket.remoteAddress}:${socket.remotePort} Says: ${data}`
        );
        socket.write(`${`${data}`.replace(/\r?\n/g, '')} www\n`);
        this.window.webContents.send('tcpConnectStateChange', data.toString());
      });
      socket.on('close', () => {
        console.log(
          `${socket.remoteAddress}:${socket.remotePort} Terminated the connection`
        );
      });
      socket.on('error', function (error) {
        console.error(
          `${socket.remoteAddress}:${socket.remotePort} Connection Error ${error}`
        );
      });
    });
    server.listen(port, host, () => {
      console.log(`server started at ${host}:${port}`);
    });
  };
}
export { TcpClient };
