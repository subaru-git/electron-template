import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const tcpStateContext = createContext<string>('');
const setTcpStateContext = createContext<Dispatch<SetStateAction<string>>>(
  () => undefined
);

/**
 * Context provider for the TCP state.
 *
 * Usage:
 * ```typescript
 * // Setup context
 * <TcpStateProvider>
 *   <App />
 * </TcpStateProvider>
 *
 * // Use context
 * const state = useStateValue();
 * const setState = useStateSetValue();
 * ```
 *
 * @param children children of the context provider
 */
const TcpStateProvider: FC = ({ children }) => {
  const [state, setState] = useState<string>('closed');

  return (
    <tcpStateContext.Provider value={state}>
      <setTcpStateContext.Provider value={setState}>
        {children}
      </setTcpStateContext.Provider>
    </tcpStateContext.Provider>
  );
};

/**
 * Context of TCP state.
 * @returns TCP state
 */
const useStateValue = () => useContext(tcpStateContext);
/**
 * Context of update TCP state function.
 * @returns update TCP state function
 */
const useStateSetValue = () => useContext(setTcpStateContext);

export { TcpStateProvider, useStateValue, useStateSetValue };
