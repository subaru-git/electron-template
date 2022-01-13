import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useStateValue, useStateSetValue } from '~/context';
const { api } = window;

/**
 * This is the TcpSettings component.
 * It has a host and port inputs and connects button.
 *
 * @returns TcpSettings component
 */
const TcpSettings: FC = () => {
  const status = useStateValue();
  const setState = useStateSetValue();
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  useEffect(() => {
    const stateChangeRemoveListener = api.tcpConnectionStateChange(
      (state: string) => {
        console.log(`log from TcpSettings ${state}`);
        setState(state);
      }
    );
    const tcpSettingsRemoveListener = api.tcpSettingsResponse(
      (host: string, port: string) => {
        setHost(host);
        setPort(port);
      }
    );
    api.tcpSettingsRequest();

    return () => {
      stateChangeRemoveListener();
      tcpSettingsRemoveListener();
    };
  }, [setState]);

  return (
    <TcpSettingsImpl
      status={status}
      host={host}
      port={port}
      setHost={setHost}
      setPort={setPort}
    />
  );
};

type TcpSettingsImplProps = {
  status: string;
  host: string;
  port: string;
  setHost: (host: string) => void;
  setPort: (port: string) => void;
};

const TcpSettingsImpl: FC<TcpSettingsImplProps> = ({
  status,
  host,
  port,
  setHost,
  setPort,
}) => {
  return (
    <div style={{ padding: '10px' }}>
      <Stack>
        <Typography
          variant="subtitle2"
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <CircleIcon
            htmlColor={
              status === 'listening'
                ? '#77FF77'
                : status === 'closed'
                ? '#CCC'
                : '#FF7777'
            }
            fontSize="small"
            sx={{ marginRight: '5px' }}
          />
          {`Status: ${status}`}
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="host"
            variant={status === 'listening' ? 'filled' : 'outlined'}
            value={host}
            onChange={(event) => {
              setHost(event.target.value);
            }}
            disabled={status === 'listening'}
          />
          <TextField
            label="port"
            variant={status === 'listening' ? 'filled' : 'outlined'}
            value={port}
            onChange={(event) => {
              setPort(event.target.value);
            }}
            disabled={status === 'listening'}
          />
          {status === 'closed' ? (
            <Button
              variant="outlined"
              color="success"
              endIcon={<AddToQueueIcon />}
              onClick={() => {
                (async () => await api.tcpListen(host, parseInt(port)))();
              }}
            >
              Listen
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelPresentationIcon />}
              onClick={() => {
                (async () => await api.tcpClose())();
              }}
            >
              Close
            </Button>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export { TcpSettings, TcpSettingsImpl };
