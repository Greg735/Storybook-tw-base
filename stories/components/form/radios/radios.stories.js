import RadiosDocs from './radios.docs.md?raw';
import RadiosSource from '@components/form/radios/radios.twig?raw';
import { elementArgTypes, renderOptionsGroup } from '../form.helpers';

export default {
  title: 'Components/Form/Radios',
  parameters: {
    docs: {
      description: {
        component: RadiosDocs,
      },
    },
    componentSource: {
      code: RadiosSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    title_display: {
      control: { type: 'select' },
      options: ['before', 'invisible'],
      description: '`#title_display`',
    },
    value: { control: 'text', description: '`#default_value`' },
    description_display: { table: { disable: true } },
    wrapper_attributes: { table: { disable: true } },
  },
};

const Template = (args) => renderOptionsGroup({ ...args, type: 'radios' });

export const Default = Template.bind({});
Default.args = {
  name: 'contact',
  title: 'Preferred contact method',
  options: { email: 'Email', phone: 'Phone', post: 'Post' },
  value: 'email',
  description: 'How should we contact you?',
  required: false,
  disabled: false,
};

export const Inline = Template.bind({});
Inline.args = {
  ...Default.args,
  name: 'contact_inline',
  attributes: { class: ['container-inline'] },
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  name: 'contact_witherror',
  value: '',
  required: true,
  errors: 'Preferred contact method field is required.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  name: 'contact_disabled',
  disabled: true,
};
