import TwigForms from './forms.local.twig';
import FormsDocs from './forms.docs.md?raw';

export default {
  title: 'Foundations/Forms',
  parameters: {
    docs: {
      description: {
        component: FormsDocs,
      },
    },
    controls: { disable: true },
  },
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
    colors: {
      table: {
        disable: true,
      },
    },
  },
  args: {},
};

export const FormsExample = (args) => TwigForms(args);
