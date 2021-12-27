import { BrowserWindow } from 'electron';
import * as net from 'net';

class TcpClient {
  private window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }

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
