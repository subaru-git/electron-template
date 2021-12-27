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

const TcpStateProvider: FC = ({ children }) => {
  const [state, setState] = useState<string>('not working');

  return (
    <tcpStateContext.Provider value={state}>
      <setTcpStateContext.Provider value={setState}>
        {children}
      </setTcpStateContext.Provider>
    </tcpStateContext.Provider>
  );
};

const useStateValue = () => useContext(tcpStateContext);
const useStateSetValue = () => useContext(setTcpStateContext);

export { TcpStateProvider, useStateValue, useStateSetValue };
