import { UdpServer } from '.';
import { BrowserWindow } from 'electron';

jest.mock('electron', () => ({
  BrowserWindow: jest.fn().mockImplementation(() => ({
    webContents: jest.fn(),
  })),
}));
jest.mock('electron-log', () => ({ info: jest.fn() }));

test('create instance is success', () => {
  const window = new BrowserWindow();
  const udpServer = new UdpServer(window);
  expect(udpServer).toBeDefined();
});

test('wake up server', (done) => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const udpServer = new UdpServer(window);
  udpServer.listen(65535);
  udpServer.close();
  done();
});

test('close running server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const udpServer = new UdpServer(window);
  udpServer.close();
});

test('close stopped server', () => {
  const window = new BrowserWindow();
  window.webContents.send = jest.fn();
  const udpServer = new UdpServer(window);
  udpServer.close();
});
