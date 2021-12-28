import path from 'path';
import { BrowserWindow, app, session } from 'electron';
import { searchDevtools } from 'electron-search-devtools';
import { initialize } from './services/main-initialize';
import windowStateKeeper from 'electron-window-state';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Get the resource directory.
 * The directory is different in development or production.
 */
const getResourceDirectory = () => {
  return isDev
    ? path.join(process.cwd(), 'dist')
    : path.join(process.resourcesPath, 'app.asar.unpacked', 'dist');
};

/// #if DEBUG

/**
 * Hot reload settings.
 */
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

/**
 * Create a window with the last window state.
 */
const createWindow = () => {
  const windowState = windowStateKeeper({
    defaultWidth: 600,
    defaultHeight: 400,
  });
  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Electron Template',
    icon: path.join(getResourceDirectory(), 'assets/icon.png'),
  });
  windowState.manage(mainWindow);

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.loadFile('dist/index.html');

  return mainWindow;
};

/**
 * when electron is ready, create the window and initialize the services.
 * @notExported
 */
app.whenReady().then(async () => {
  if (isDev) {
    const devtool = await searchDevtools('REACT', { browser: 'google-chrome' });
    if (devtool) {
      await session.defaultSession.loadExtension(devtool, {
        allowFileAccess: true,
      });
    }
  }

  const window = createWindow();
  initialize(window);
});

/**
 * Quit when all windows are closed.
 */
app.once('window-all-closed', () => app.quit());
