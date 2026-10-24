import CheckboxDocs from './checkbox.docs.md?raw';
import InputSource from '@components/form/input/input.twig?raw';
import { elementArgTypes, renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Checkbox',
  parameters: {
    docs: {
      description: {
        component: CheckboxDocs,
      },
    },
    componentSource: {
      code: InputSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    checked: { control: 'boolean', description: '`#default_value`' },
    options: { table: { disable: true } },
  },
};

const Template = (args) => renderFormElement({ ...args, type: 'checkbox' });

export const Default = Template.bind({});
Default.args = {
  name: 'newsletter',
  title: 'Subscribe to the newsletter',
  checked: false,
  required: false,
  disabled: false,
};

export const Required = Template.bind({});
Required.args = {
  name: 'terms',
  title: 'I accept the terms and conditions',
  description: 'You must accept the terms to continue.',
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Required.args,
  errors: 'You must accept the terms and conditions.',
};

export const Switch = Template.bind({});
Switch.args = {
  name: 'notifications',
  title: 'Enable notifications',
  checked: true,
  wrapper_attributes: { class: ['form-switch'] },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  checked: true,
  disabled: true,
};
