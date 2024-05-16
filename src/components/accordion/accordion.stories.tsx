import { Meta, StoryFn } from "@storybook/react";
import { Accordion } from "./accordion";

export default {
    title: 'Components/Accordion',
    Component: Accordion,
} as Meta

const Template: StoryFn<typeof Accordion> = (args) => (
    <Accordion {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Accordion 1',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna diam, tincidunt nec porta sed, auctor id velit. Etiam venenatis nisl ut orci consequat, vitae tempus quam commodo. Nulla non mauris ipsum. Aliquam eu posuere orci. Nulla convallis lectus rutrum quam hendrerit, in facilisis elit sollicitudin. Mauris pulvinar pulvinar mi, dictum tristique elit auctor quis. Maecenas ac ipsum ultrices, porta turpis sit amet, congue turpis.',
}