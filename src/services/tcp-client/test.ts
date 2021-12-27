import { TcpClient } from '.';
import { BrowserWindow } from 'electron';

jest.mock('electron', () => ({
  BrowserWindow: jest.fn(),
}));
jest.mock('net', () => ({
  createServer: jest.fn().mockImplementation(() => ({ listen: jest.fn() })),
}));

test('create instance is success', () => {
  const window = new BrowserWindow();
  const tcpClient = new TcpClient(window);
  expect(tcpClient).toBeDefined();
});

test('wake up server', () => {
  const window = new BrowserWindow();
  const tcpClient = new TcpClient(window);
  tcpClient.connect('localhost', 65535);
});
