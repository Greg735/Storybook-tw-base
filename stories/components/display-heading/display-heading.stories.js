import TwigDisplayHeading from '@components/display-heading/display-heading.twig';
import DisplayHeadingDocs from './display-heading.docs.md?raw';
import DisplayHeadingSource from '@components/display-heading/display-heading.twig?raw';

export default {
  title: 'Components/Headings/Display',
  parameters: {
    componentSource: {
      code: DisplayHeadingSource,
      language: 'twig',
    },
    docs: {
      subtitle: 'Display headings 1-6',
      description: {
        component: DisplayHeadingDocs,
      },
    },
  },
  argTypes: {
    display_heading_level: {
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
    display_heading_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
  args: { display_heading_level: 1, text: 'Sample display text', heading_classes: ['text-center', 'text-uppercase'] },
};

const Template = (args) => TwigDisplayHeading(args);

export const Default = Template.bind({});
Default.args = {
  display_heading_level: 2,
};
