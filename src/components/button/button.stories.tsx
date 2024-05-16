import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";
import { useState } from "react";

export default {
    title: 'Components/Button',
    Component: Button,
} as Meta

const Template: StoryFn<typeof Button> = ({ onClick, children, ...args}) => {
    const [show, setShow] = useState(false)

    return (
        <div>
            {show && <p>I was Hidden</p>}
            <Button 
                {...args}
                onClick={(event) => {
                    onClick?.(event)
                    setShow(!show)
                }
                } 
            >
                {children ? children : 'Reveal Hidden Content'}
            </Button>
        </div>
    )
}

export const Primary = Template.bind({})
Primary.args = {
    children: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
    children: 'Button',
    variant: 'secondary'
}

export const Contrast = Template.bind({})
Contrast.args = {
    children: 'Button',
    variant: 'contrast'
}

export const OutlinePrimary = Template.bind({})
OutlinePrimary.args = {
    children: 'Button',
    outlined: true
}

export const OutlineSecondary = Template.bind({})
OutlineSecondary.args = {
    children: 'Button',
    variant: 'secondary',
    outlined: true
}

export const OutlineContrast = Template.bind({})
OutlineContrast.args = {
    children: 'Button',
    variant: 'contrast',
    outlined: true
}

export const DisabledPrimary = Template.bind({})
DisabledPrimary.args = {   
    children : 'Button',
    disabled : true
}

export const DisabledSecondary = Template.bind({})
DisabledSecondary.args = {
    children: 'Button',
    variant: 'secondary',
    disabled: true  
}

export const DisabledContrast = Template.bind({})
DisabledContrast.args = {
    children: 'Button',
    variant: 'contrast',
    disabled: true  
}

export const DisabledOutlinePrimary = Template.bind({})
DisabledOutlinePrimary.args = {
    children: 'Button',
    variant: 'primary',
    outlined: true,
    disabled: true  
}

export const DisabledOutlineSecondary = Template.bind({})
DisabledOutlineSecondary.args = {
    children: 'Button',
    variant: 'secondary',
    outlined: true,
    disabled: true  
}

export const DisabledOutlineContrast = Template.bind({})
DisabledOutlineContrast.args = {
    children: 'Button',
    variant: 'contrast',
    outlined: true,
    disabled: true  
}
