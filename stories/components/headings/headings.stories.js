import TwigHeadings from '@components/headings/headings.twig';
import HeadingsDocs from './headings.docs.md?raw';
import HeadingSource from '@components/headings/headings.twig?raw';

export default {
  title: 'Components/Headings',
  parameters: {
    componentSource: {
      code: HeadingSource,
      language: 'twig',
    },
    docs: {
      subtitle: 'HTML heading elements (h1-h6)',
      description: {
        component: HeadingsDocs,
      },
    },
  },
  argTypes: {
    heading_level: {
      name: 'Heading level',
      description: 'Semantic heading level (h1-h6)',
      control: {
        type: 'range',
        min: 1,
        max: 6,
        step: 1,
      },
    },
    text: {
      name: 'Heading text',
      description: 'Sample text for heading',
      control: {
        type: 'text',
      },
    },
    heading_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
  args: { heading_level: 1, text: 'Sample heading text', heading_classes: ['text-center', 'text-uppercase'] },
};

const Template = (args) => TwigHeadings(args);

export const Default = Template.bind({});
Default.args = {
  heading_level: 2,
};
