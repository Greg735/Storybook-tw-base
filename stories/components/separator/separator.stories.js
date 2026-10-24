import separatorTemplate from '@components/separator/separator.twig';
import SeparatorDocs from './separator.docs.md?raw';
import SeparatorSource from '@components/separator/separator.twig?raw';

export default {
  title: 'Components/Separator',
  parameters: {
    componentSource: {
      code: SeparatorSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: SeparatorDocs,
      },
    },
  },
  argTypes: {
    separator_classes: {
      control: 'array',
      description: 'CSS classes to apply to the separator.',
      defaultValue: null,
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: 'null' },
      },
    },
    separator_attributes: {
      control: 'object',
      description: 'HTML attributes to add to the separator.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

const Template = (args) => separatorTemplate(args);

export const Default = Template.bind({});
Default.args = {
  // separator_classes: [''],
};

export const WithClasses = Template.bind({});
WithClasses.args = {
  separator_classes: ['text-danger', 'opacity-100', 'border-t-3', 'my-12'],
};
