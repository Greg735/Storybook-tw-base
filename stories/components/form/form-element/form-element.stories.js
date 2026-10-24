import FormElementDocs from './form-element.docs.md?raw';
import FormElementSource from '@components/form/form-element/form-element.twig?raw';
import { elementArgTypes, renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Form element',
  parameters: {
    docs: {
      description: {
        component: FormElementDocs,
      },
    },
    componentSource: {
      code: FormElementSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    type: {
      control: { type: 'select' },
      options: ['textfield', 'email', 'number', 'select', 'textarea', 'checkbox'],
      description: '`#type`',
    },
    field_prefix: { control: 'text', description: '`#field_prefix`' },
    field_suffix: { control: 'text', description: '`#field_suffix`' },
    options: { table: { disable: true } },
  },
};

const Template = (args) => renderFormElement(args);

export const Default = Template.bind({});
Default.args = {
  type: 'textfield',
  name: 'full_name',
  title: 'Full name',
  description: 'First name and last name.',
  description_display: 'after',
  required: false,
  disabled: false,
};

export const DescriptionBefore = Template.bind({});
DescriptionBefore.args = {
  ...Default.args,
  name: 'full_name_before',
  description_display: 'before',
};

export const PrefixSuffix = Template.bind({});
PrefixSuffix.args = {
  type: 'number',
  name: 'weight',
  title: 'Weight',
  field_prefix: '≈',
  field_suffix: 'kg',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  name: 'full_name_error',
  required: true,
  errors: 'Full name field is required.',
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  type: 'checkbox',
  name: 'remember',
  title: 'Remember me',
  description: 'Stay logged in on this device.',
};
