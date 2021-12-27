declare global {
  interface Window {
    api: IApi;
  }
}
export interface IApi {
  tcpConnect: (message: string) => Promise<void>;
  tcpConnectStateChange: (listener: (message: string) => void) => () => void;
}
