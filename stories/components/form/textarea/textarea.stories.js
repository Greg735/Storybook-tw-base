import TextareaDocs from './textarea.docs.md?raw';
import TextareaSource from '@components/form/textarea/textarea.twig?raw';
import { elementArgTypes, renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Textarea',
  parameters: {
    docs: {
      description: {
        component: TextareaDocs,
      },
    },
    componentSource: {
      code: TextareaSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    value: { control: 'text', description: '`#default_value`' },
    placeholder: { control: 'text', description: '`#placeholder`' },
    rows: { control: 'number', description: '`#rows`' },
    resizable: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: '`#resizable`',
    },
    options: { table: { disable: true } },
  },
};

const Template = (args) => renderFormElement({ ...args, type: 'textarea' });

export const Default = Template.bind({});
Default.args = {
  name: 'message',
  title: 'Message',
  placeholder: 'Your message…',
  description: 'Maximum 1000 characters.',
  rows: 5,
  resizable: 'vertical',
  required: false,
  disabled: false,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  required: true,
  errors: 'Message field is required.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  value: 'This message can no longer be edited.',
  disabled: true,
};
