import buttonTemplate from '@components/button/button.twig';
import ButtonSource from '@components/button/button.twig?raw';
import { constants } from '../_constants';

export default {
  title: 'Components/Button/Button',
  parameters: {
    componentSource: {
      code: ButtonSource,
      language: 'twig',
    },
  },
  argTypes: {
    label: {
      control: 'text',
      type: {
        required: true,
      },
    },
    type_attr: {
      control: { type: 'radio' },
      options: constants.button.type,
      description: '**options**',
      table: {
        required: true,
        type: {
          summary: constants.button.type.map((option) => `'${option}'`).join('|'),
        },
        defaultValue: { summary: 'button' },
      },
    },
    type: {
      control: { type: 'select' },
      options: constants.button.theme.options,
      description: '**options**',
      table: {
        type: {
          summary: constants.button.theme.options.map((option) => `'${option}'`).join('|'),
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: '**options**',
      control: { type: 'radio' },
      options: constants.sizes.options,
      table: {
        type: {
          summary: constants.sizes.options.map((option) => `'${option}'`).join('|'),
        },
      },
    },
    with_icon: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    full_width: {
      control: { type: 'boolean' },
    },
    rounded_pill: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => buttonTemplate(args);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary button',
  type_attr: 'button',
  type: 'primary',
  size: 'default',
  outlined: false,
  disabled: false,
  full_width: false,
  rounded_pill: false,
  with_icon: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  label: 'Secondary button',
  type: 'secondary',
};

export const Blue = Template.bind({});
Blue.args = {
  ...Primary.args,
  label: 'Blue button',
  type: 'blue',
};

export const Gray = Template.bind({});
Gray.args = {
  ...Primary.args,
  label: 'Gray button',
  type: 'gray',
};

export const Green = Template.bind({});
Green.args = {
  ...Primary.args,
  label: 'Green button',
  type: 'green',
};

export const Red = Template.bind({});
Red.args = {
  ...Primary.args,
  label: 'Red button',
  type: 'red',
};

export const Orange = Template.bind({});
Orange.args = {
  ...Primary.args,
  label: 'Orange button',
  type: 'orange',
};

export const Cyan = Template.bind({});
Cyan.args = {
  ...Primary.args,
  label: 'Cyan button',
  type: 'cyan',
};

export const Light = Template.bind({});
Light.args = {
  ...Primary.args,
  label: 'Light button',
  type: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  ...Primary.args,
  label: 'Dark button',
  type: 'dark',
};

export const White = Template.bind({});
White.args = {
  ...Primary.args,
  label: 'White button',
  type: 'white',
};

export const Black = Template.bind({});
Black.args = {
  ...Primary.args,
  label: 'Black button',
  type: 'black',
};
