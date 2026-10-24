import ParagraphTemplate from '@components/paragraph/paragraph.twig';
import ParagraphDocs from './paragraph.docs.md?raw';
import ParagraphSource from '@components/paragraph/paragraph.twig?raw';

export default {
  title: 'Components/Paragraph',
  parameters: {
    componentSource: {
      code: ParagraphSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ParagraphDocs,
      },
    },
  },
  args: {},
  argTypes: {
    classes: {
      control: 'text',
      type: {
        required: false,
      },
    },
    highlight: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    type: {
      control: { type: 'select' },
      defaultValue: 'primary',
      options: ['success', 'danger', 'warning', 'info'],
      table: {
        require: 'true',
        type: { summary: 'string' },
      },
      if: {
        arg: 'highlight',
      },
    },
    subtle: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      if: {
        arg: 'highlight',
      },
    },
    content: {
      control: 'text',
      type: {
        required: true,
      },
    },
  },
};

const Template = (args) => ParagraphTemplate(args);

export const Default = Template.bind({});
Default.args = {
  classes: '',
  highlight: false,
  type: null,
  subtle: false,
  content:
    'Integer risus velit, imperdiet eu gravida vel, vestibulum et eros. Donec mollis est nulla, eget tincidunt quam lobortis non. Phasellus pellentesque eget lorem in fringilla. Cras eget risus elit. Curabitur mollis eget risus eu tempus. Pellentesque id eleifend enim. Quisque facilisis molestie tellus. Suspendisse nec vehicula velit, eu pellentesque elit. Curabitur a egestas leo. Praesent sed augue tortor. In ac ex ut nibh sollicitudin faucibus non ac nibh. Quisque augue arcu, volutpat ut justo bibendum, dictum blandit purus. Nulla ornare nibh a pellentesque auctor. Suspendisse porta turpis non mauris tristique, id commodo tortor tincidunt. Vestibulum ut dui et enim lacinia condimentum.',
};

export const HighlightDanger = Template.bind({});
HighlightDanger.args = {
  ...Default.args,
  highlight: true,
  type: 'danger',
  subtle: false,
};

export const HighlightDangerSubtle = Template.bind({});
HighlightDangerSubtle.args = {
  ...HighlightDanger.args,
  subtle: true,
};

export const HighlightWarning = Template.bind({});
HighlightWarning.args = {
  ...Default.args,
  highlight: true,
  type: 'warning',
  subtle: false,
};

export const HighlightWarningSubtle = Template.bind({});
HighlightWarningSubtle.args = {
  ...HighlightWarning.args,
  subtle: true,
};
