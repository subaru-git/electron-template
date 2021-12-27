import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('api', {
  tcpConnect: async (message: string): Promise<void> => {
    console.log(`log from tcpConnect ${message}`);
    await ipcRenderer.send('tcpConnect', message);
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
