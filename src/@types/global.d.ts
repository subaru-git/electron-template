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
  tcpListen: (host: string, port: number) => Promise<void>;
  /**
   * Close the TCP server.
   */
  tcpClose: () => Promise<void>;
  /**
   * Connection state Changed.
   *
   * @param listener The listener function for TCP state change.
   */
  tcpConnectionStateChange: (listener: (message: string) => void) => () => void;
  /**
   * Receive message from client.
   */
  tcpMessage: (listener: (message: string) => void) => () => void;
}
