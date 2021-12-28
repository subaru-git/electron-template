import { TcpClient } from '.';
import { BrowserWindow } from 'electron';

jest.mock('electron', () => ({
  BrowserWindow: jest.fn().mockImplementation(() => ({
    webContents: jest.fn(),
  })),
}));
const listening = jest.fn();
jest.mock('net', () => ({
  createServer: jest.fn().mockImplementation(() => ({
    listen: jest.fn(),
    close: jest.fn(),
    listening: listening,
  })),
}));

test('create instance is success', () => {
  const window = new BrowserWindow();
  const tcpClient = new TcpClient(window);
  expect(tcpClient).toBeDefined();
});

test('wake up server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpClient = new TcpClient(window);
  tcpClient.listen('localhost', 65535);
});

test('close running server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpClient = new TcpClient(window);
  listening.mockReturnValue(true);
  tcpClient.close();
});

test('close stopped server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpClient = new TcpClient(window);
  listening.mockReturnValue(false);
  tcpClient.close();
});
