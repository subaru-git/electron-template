import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

/**
 * The `window.api` object settings in the renderer process.
 * This is [Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation) settings.
 */
contextBridge.exposeInMainWorld('api', {
  tcpConnect: async (host: string, port: number): Promise<void> => {
    console.log(`log from tcpConnect host ${host}, port ${port}`);
    await ipcRenderer.send('tcpConnect', host, port);
  },
  tcpConnectStateChange: (listener: (message: string) => void) => {
    console.log(`prepare to listen tcpConnect`);
    ipcRenderer.on(
      'tcpConnectStateChange',
      (event: IpcRendererEvent, message: string) => listener(message)
    );
    return () => {
      console.log(`remove listener tcpConnectStateChange`);
      ipcRenderer.removeAllListeners('tcpConnectStateChange');
    };
  },
});
