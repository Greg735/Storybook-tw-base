import FormElementLabelDocs from './form-element-label.docs.md?raw';
import formElementLabelTemplate from '@components/form/form-element-label/form-element-label.twig';
import FormElementLabelSource from '@components/form/form-element-label/form-element-label.twig?raw';
import { attributes } from '../form.helpers';

export default {
  title: 'Components/Form/Form element label',
  parameters: {
    docs: {
      description: {
        component: FormElementLabelDocs,
      },
    },
    componentSource: {
      code: FormElementLabelSource,
      language: 'twig',
    },
  },
  argTypes: {
    title: { control: 'text', description: '`#title`' },
    title_display: {
      control: { type: 'select' },
      options: ['before', 'after', 'invisible'],
      description: '`#title_display`',
    },
    required: { control: 'boolean', description: '`#required`' },
    for: { control: 'text', description: '`for` attribute (element id)' },
  },
};

const Template = ({ for: forId, ...args }) =>
  formElementLabelTemplate({
    ...args,
    attributes: attributes({ for: forId }),
  });

export const Default = Template.bind({});
Default.args = {
  title: 'Full name',
  title_display: 'before',
  required: false,
  for: 'edit-full-name',
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  required: true,
};

export const After = Template.bind({});
After.args = {
  ...Default.args,
  title: 'I accept the terms',
  title_display: 'after',
};

export const Invisible = Template.bind({});
Invisible.args = {
  ...Default.args,
  title_display: 'invisible',
};
