import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TcpSettings } from '.';

export default {
  title: 'TCP Settings',
  component: TcpSettings,
} as ComponentMeta<typeof TcpSettings>;

const Template: ComponentStory<typeof TcpSettings> = (args) => (
  <TcpSettings {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
