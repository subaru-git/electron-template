import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TcpSettingsImpl } from '.';

export default {
  title: 'TCP Settings',
} as ComponentMeta<typeof TcpSettingsImpl>;

const Template: ComponentStory<typeof TcpSettingsImpl> = (args) => (
  <TcpSettingsImpl {...args} />
);

export const ServerClosed = Template.bind({});
ServerClosed.args = {
  status: 'closed',
};
export const ServerListening = Template.bind({});
ServerListening.args = {
  status: 'listening',
  host: 'localhost',
  port: '8888',
};
