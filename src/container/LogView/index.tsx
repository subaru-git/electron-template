import React, { FC, useState, useEffect } from 'react';
import { LazyLog } from 'react-lazylog';
const { api } = window;

/**
 * This is the LogView component.
 * It receives a message from the TCP client and displays it like a log.
 *
 * @returns LogView component
 */
const LogView: FC = () => {
  const [log, setLog] = useState([] as string[]);
  useEffect(() => {
    const removeListener = api.tcpMessage((message: string) => {
      setLog([...log, message]);
    });
    return () => {
      removeListener();
    };
  }, [log, setLog]);
  return <LogViewImpl log={log} />;
};

type LogViewImplProps = {
  log: string[];
};

const LogViewImpl: FC<LogViewImplProps> = ({ log }) => {
  return (
    <div className="p-2" style={{ height: 300, width: '100%' }}>
      <LazyLog
        extraLines={1}
        enableSearch
        text={log.length === 0 ? 'nop' : log.join('\n')}
      />
    </div>
  );
};

export { LogView, LogViewImpl };
