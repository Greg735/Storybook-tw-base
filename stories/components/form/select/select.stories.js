import SelectDocs from './select.docs.md?raw';
import SelectSource from '@components/form/select/select.twig?raw';
import { elementArgTypes, renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Select',
  parameters: {
    docs: {
      description: {
        component: SelectDocs,
      },
    },
    componentSource: {
      code: SelectSource,
      language: 'twig',
    },
  },
  argTypes: {
    ...elementArgTypes,
    value: { control: 'text', description: '`#default_value`' },
    multiple: { control: 'boolean', description: '`#multiple`' },
  },
};

const Template = (args) => renderFormElement({ ...args, type: 'select' });

const cantons = {
  '': '- Select -',
  vd: 'Vaud',
  ge: 'Genève',
  ne: 'Neuchâtel',
  fr: 'Fribourg',
  vs: 'Valais',
  ju: 'Jura',
};

export const Default = Template.bind({});
Default.args = {
  name: 'canton',
  title: 'Canton',
  options: cantons,
  value: '',
  description: 'Canton of residence.',
  required: false,
  disabled: false,
};

export const OptionGroups = Template.bind({});
OptionGroups.args = {
  name: 'service',
  title: 'Service',
  options: {
    '': '- Select -',
    Consultations: { general: 'General medicine', travel: 'Travel medicine' },
    Prevention: { vaccination: 'Vaccination', screening: 'Screening' },
  },
};

export const Multiple = Template.bind({});
Multiple.args = {
  name: 'languages',
  title: 'Languages',
  multiple: true,
  value: ['fr', 'en'],
  options: { fr: 'French', de: 'German', it: 'Italian', en: 'English' },
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  required: true,
  errors: 'Canton field is required.',
};
