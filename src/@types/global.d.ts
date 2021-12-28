declare global {
  interface Window {
    api: IApi;
  }
}

/**
 * Tcp connection api.
 */
export interface IApi {
  /**
   * Start the TCP server.
   *
   * @param host The host to listen to.
   * @param port The port to listen to.
   */
  tcpConnect: (host: string, port: number) => Promise<void>;
  /**
   * Connection state Changed.
   *
   * @param listener The listener function for TCP state change.
   */
  tcpConnectStateChange: (listener: (message: string) => void) => () => void;
}
