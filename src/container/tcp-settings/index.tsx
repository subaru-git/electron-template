import React, { FC, useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useStateValue, useStateSetValue } from '~/context';
const { api } = window;

/**
 * This is the TcpSettings component.
 * It has a host and port inputs and connects button.
 *
 * @returns TcpSettings component
 */
const TcpSettings: FC = () => {
  const state = useStateValue();
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
  }, []);
  return (
    <div>
      <Form>
        <Form.Group>
          <Row>
            <Col sm={{ span: 8, offset: 4 }}>
              <Form.Text className="text-muted">{`Status: ${state}`}</Form.Text>
            </Col>{' '}
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Form.Control
                type="text"
                placeholder="host"
                value={host}
                onChange={(event) => {
                  setHost(event.target.value);
                }}
              />
            </Col>
            <Col sm={2}>
              <Form.Control
                type="text"
                placeholder="port"
                value={port}
                onChange={(event) => {
                  setPort(event.target.value);
                }}
              />
            </Col>
            <Col sm={2}>
              {state === 'closed' ? (
                <Button
                  onClick={() => {
                    (async () => await api.tcpListen(host, parseInt(port)))();
                  }}
                >
                  Listen
                </Button>
              ) : (
                <Button
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
