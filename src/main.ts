import path from 'path';
import { BrowserWindow, app, session, ipcMain } from 'electron';
import { searchDevtools } from 'electron-search-devtools';
import { connect } from './services/tcp-client';

const isDev = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow | null = null;

const getResourceDirectory = () => {
  return isDev
    ? path.join(process.cwd(), 'dist')
    : path.join(process.resourcesPath, 'app.asar.unpacked', 'dist');
};

/// #if DEBUG
if (isDev) {
  const execPath =
    process.platform === 'win32'
      ? '../node_modules/electron/dist/electron.exe'
      : '../node_modules/.bin/electron';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}
/// #endif

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Electron React TS',
    icon: path.join(getResourceDirectory(), 'assets/icon.png'),
  });

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(async () => {
  if (isDev) {
    const devtool = await searchDevtools('REACT', { browser: 'google-chrome' });
    if (devtool) {
      await session.defaultSession.loadExtension(devtool, {
        allowFileAccess: true,
      });
    }
  }

  createWindow();
});

app.once('window-all-closed', () => app.quit());

ipcMain.on('tcpConnect', async (event, message) => {
  console.log(`log main on tcpConnect ${message}`);
  connect('localhost', 8888);
  event.reply('tcpConnectStateChange', 'hello');
  // mainWindow?.webContents.send('tcpConnectStateChange', 'send from main');
});
