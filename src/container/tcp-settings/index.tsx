import React, { FC, useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FaCircle } from 'react-icons/fa';
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
    const removeListener = api.tcpConnectionStateChange((message: string) => {
      console.log(`log from TcpSettings ${message}`);
      setState(message);
    });
    return () => {
      removeListener();
    };
  }, [setState]);
  return (
    <div style={{ paddingLeft: '10px' }}>
      <Form>
        <Form.Group>
          <Row>
            <Col>
              <Form.Text className="text-muted">
                <FaCircle
                  color={
                    status === 'closed'
                      ? '#ccc'
                      : status === 'listening'
                      ? '#77FF77'
                      : '#FF7777'
                  }
                />
                {`Status: ${status}`}
              </Form.Text>
            </Col>{' '}
          </Row>
          <Row>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="host"
                value={host}
                onChange={(event) => {
                  setHost(event.target.value);
                }}
                disabled={status === 'listening'}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="port"
                value={port}
                onChange={(event) => {
                  setPort(event.target.value);
                }}
                disabled={status === 'listening'}
              />
            </Col>
            <Col sm={2}>
              {status === 'closed' ? (
                <Button
                  variant="outline-success"
                  onClick={() => {
                    (async () => await api.tcpListen(host, parseInt(port)))();
                  }}
                >
                  Listen
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    (async () => await api.tcpClose())();
                  }}
                >
                  Close
                </Button>
              )}
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export { TcpSettings };
