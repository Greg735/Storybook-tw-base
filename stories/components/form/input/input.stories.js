import InputDocs from './input.docs.md?raw';
import InputSource from '@components/form/input/input.twig?raw';
import { elementArgTypes, renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Input',
  parameters: {
    docs: {
      description: {
        component: InputDocs,
      },
    },
    componentSource: {
      code: InputSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    type: {
      control: { type: 'select' },
      options: ['textfield', 'email', 'password', 'tel', 'url', 'search', 'number', 'date', 'file', 'color', 'range'],
      description: '`#type`',
    },
    value: { control: 'text', description: '`#default_value`' },
    placeholder: { control: 'text', description: '`#placeholder`' },
    field_prefix: { control: 'text', description: '`#field_prefix`' },
    field_suffix: { control: 'text', description: '`#field_suffix`' },
    options: { table: { disable: true } },
  },
};

const Template = (args) => renderFormElement(args);

export const Textfield = Template.bind({});
Textfield.args = {
  type: 'textfield',
  name: 'full_name',
  title: 'Full name',
  placeholder: 'Jane Doe',
  description: 'First name and last name.',
  required: false,
  disabled: false,
};

export const Required = Template.bind({});
Required.args = {
  ...Textfield.args,
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  type: 'email',
  name: 'mail',
  title: 'Email address',
  value: 'jane.doe@',
  required: true,
  errors: 'The email address <em>jane.doe@</em> is not valid.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Textfield.args,
  value: 'Jane Doe',
  disabled: true,
};

export const PrefixSuffix = Template.bind({});
PrefixSuffix.args = {
  type: 'number',
  name: 'price',
  title: 'Price',
  field_prefix: 'CHF',
  field_suffix: '.00',
  description: 'Price including VAT.',
};

export const InvisibleLabel = Template.bind({});
InvisibleLabel.args = {
  type: 'search',
  name: 'keys',
  title: 'Search',
  title_display: 'invisible',
  placeholder: 'Search…',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  name: 'pass',
  title: 'Password',
  required: true,
};

export const DateInput = Template.bind({});
DateInput.args = {
  type: 'date',
  name: 'birthdate',
  title: 'Date of birth',
};

export const FileInput = Template.bind({});
FileInput.args = {
  type: 'file',
  name: 'files[cv]',
  title: 'Curriculum vitae',
  description: 'Allowed types: pdf. Maximum size: 2 MB.',
};

export const ColorInput = Template.bind({});
ColorInput.args = {
  type: 'color',
  name: 'color',
  title: 'Color',
  value: '#0d6efd',
};

export const RangeInput = Template.bind({});
RangeInput.args = {
  type: 'range',
  name: 'satisfaction',
  title: 'Satisfaction',
  value: 7,
  attributes: { min: 0, max: 10 },
};
