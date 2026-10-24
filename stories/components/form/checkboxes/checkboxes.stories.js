import CheckboxesDocs from './checkboxes.docs.md?raw';
import CheckboxesSource from '@components/form/checkboxes/checkboxes.twig?raw';
import { elementArgTypes, renderOptionsGroup } from '../form.helpers';

export default {
  title: 'Components/Form/Checkboxes',
  parameters: {
    docs: {
      description: {
        component: CheckboxesDocs,
      },
    },
    componentSource: {
      code: CheckboxesSource,
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
    value: { control: 'object', description: '`#default_value`' },
    description_display: { table: { disable: true } },
    wrapper_attributes: { table: { disable: true } },
  },
};

const Template = (args) => renderOptionsGroup({ ...args, type: 'checkboxes' });

export const Default = Template.bind({});
Default.args = {
  name: 'topics',
  title: 'Topics of interest',
  options: { health: 'Health', research: 'Research', training: 'Training' },
  value: ['health'],
  description: 'Select all that apply.',
  required: false,
  disabled: false,
};

export const Inline = Template.bind({});
Inline.args = {
  ...Default.args,
  attributes: { class: ['container-inline'] },
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  value: [],
  required: true,
  errors: 'Select at least one topic.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
