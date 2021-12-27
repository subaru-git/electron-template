import React, { FC, useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
const { api } = window;

const TcpSettings: FC = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [status, setStatus] = useState('disconnected');
  useEffect(() => {
    const removeListener = api.tcpConnectStateChange((message: string) => {
      console.log(`log from TcpSettings ${message}`);
      setStatus(message);
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
              <Form.Text className="text-muted">
                Enter your listening host and port.
              </Form.Text>
            </Col>
            <Col sm={{ span: 8, offset: 4 }}>
              <Form.Text className="text-muted">
                {`Status: ${status}`}
              </Form.Text>
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
              <Button
                onClick={() => {
                  console.log(host, port);
                  (async () => await api.tcpConnect(host, parseInt(port)))();
                }}
              >
                Connect
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export { TcpSettings };
