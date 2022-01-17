import React, { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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
  return (
    <LogViewImpl
      log={log}
      onClear={() => {
        setLog([]);
      }}
    />
  );
};

type LogViewImplProps = {
  log: string[];
  onClear: () => void;
};

const LogViewImpl: FC<LogViewImplProps> = ({ log, onClear }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        height: 300,
        width: 'calc(100% - 32px)',
        p: 2,
      }}
    >
      <Box>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onClear}>
          Clear
        </Button>
      </Box>
      <Box sx={{ height: 300, width: 'calc(100% - 32px)' }}>
        <LazyLog
          extraLines={1}
          enableSearch
          text={log.length === 0 ? 'No message received' : log.join('\n')}
        />
      </Box>
    </Box>
  );
};

export { LogView, LogViewImpl };
