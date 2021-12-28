import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LogViewImpl } from '.';

export default {
  title: 'LogView',
} as ComponentMeta<typeof LogViewImpl>;

const Template: ComponentStory<typeof LogViewImpl> = (args) => (
  <LogViewImpl {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  log: [],
};
export const Default = Template.bind({});
Default.args = {
  log: ['log1', 'log2', 'log3'],
};
