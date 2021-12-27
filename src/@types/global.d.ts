declare global {
  interface Window {
    api: IApi;
  }
}
export interface IApi {
  tcpConnect: (host: string, port: number) => Promise<void>;
  tcpConnectStateChange: (listener: (message: string) => void) => () => void;
}
