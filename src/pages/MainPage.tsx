import React, { FC, useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
const { api } = window;

const MainPage: FC = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  useEffect(() => {
    const removeListener = api.tcpConnectStateChange((message: string) => {
      console.log(`log from MainPage ${message}`);
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
                  (async () => await api.tcpConnect('want to connect!'))();
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

export { MainPage };
