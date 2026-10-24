import SubmitDocs from './submit.docs.md?raw';
import InputSource from '@components/form/input/input.twig?raw';
import { renderFormElement } from '../form.helpers';

export default {
  title: 'Components/Form/Submit',
  parameters: {
    docs: {
      description: {
        component: SubmitDocs,
      },
    },
    componentSource: {
      code: InputSource,
      language: 'twig',
    },
  },
  argTypes: {
    value: { control: 'text', description: '`#value`' },
    button_type: {
      control: { type: 'select' },
      options: ['', 'primary', 'danger'],
      description: '`#button_type`',
    },
    disabled: { control: 'boolean', description: '`#disabled`' },
  },
};

const Template = (args) => renderFormElement({ ...args, type: 'submit' });

export const Primary = Template.bind({});
Primary.args = {
  value: 'Save',
  button_type: 'primary',
  disabled: false,
};

export const Default = Template.bind({});
Default.args = {
  value: 'Preview',
  button_type: '',
};

export const Danger = Template.bind({});
Danger.args = {
  value: 'Delete',
  button_type: 'danger',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  disabled: true,
};
