import { StoryFn, Meta } from '@storybook/react'

import { Dropdown } from './dropdown'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>

const Template: StoryFn<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Dropdown',
  options: ['Option 1', 'Option 2'],
}

export const Button = Template.bind({})
Button.args = {
  title: 'Dropdown',
  options: ['Option 1', 'Option 2'],
  isButton: true,
}