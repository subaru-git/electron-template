import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LogView } from '.';

export default {
  title: 'LogView',
} as ComponentMeta<typeof LogView>;

const Template: ComponentStory<typeof LogView> = (args) => (
  <LogView {...args} />
);

export const Empty = Template.bind({});
