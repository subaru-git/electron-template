import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TcpSettings } from '.';
import { TcpStateProvider } from '~/context';

export default {
  title: 'TCP Settings',
} as ComponentMeta<typeof TcpSettings>;

const Template: ComponentStory<typeof TcpSettings> = (args) => (
  <TcpSettings {...args} />
);

export const ServerClosed = Template.bind({});
ServerClosed.decorators = [
  (Story) => <TcpStateProvider initial="closed">{Story()}</TcpStateProvider>,
];
export const ServerListening = Template.bind({});
ServerListening.decorators = [
  (Story) => <TcpStateProvider initial="listening">{Story()}</TcpStateProvider>,
];
