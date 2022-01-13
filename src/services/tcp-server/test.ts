import { TcpServer } from '.';
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

jest.mock('electron-log', () => ({ info: jest.fn() }));

test('create instance is success', () => {
  const window = new BrowserWindow();
  const tcpServer = new TcpServer(window);
  expect(tcpServer).toBeDefined();
});

test('wake up server', (done) => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpServer = new TcpServer(window);
  tcpServer.listen('localhost', 65535);
  tcpServer.close();
  done();
});

test('close running server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpServer = new TcpServer(window);
  listening.mockReturnValue(true);
  tcpServer.close();
});

test('close stopped server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpServer = new TcpServer(window);
  listening.mockReturnValue(false);
  tcpServer.close();
});

test('settings request', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const tcpServer = new TcpServer(window);
  tcpServer.settingsRequest();
});
