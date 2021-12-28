import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

/**
 * The `window.api` object settings in the renderer process.
 * This is [Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation) settings.
 */
contextBridge.exposeInMainWorld('api', {
  tcpListen: async (host: string, port: number): Promise<void> => {
    console.log(`log from tcpListen host ${host}, port ${port}`);
    await ipcRenderer.send('tcp-listen', host, port);
  },
  tcpClose: async (): Promise<void> => {
    console.log(`log from tcpClose`);
    await ipcRenderer.send('tcp-close');
  },
  tcpConnectionStateChange: (listener: (message: string) => void) => {
    console.log(`prepare to listen tcpConnect`);
    ipcRenderer.on(
      'tcp-connection-state-change',
      (event: IpcRendererEvent, message: string) => listener(message)
    );
    return () => {
      console.log(`remove listener tcpConnectionStateChange`);
      ipcRenderer.removeAllListeners('tcp-connection-state-change');
    };
  },
});
