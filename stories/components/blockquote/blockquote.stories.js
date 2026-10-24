import TwigBlockquote from '@components/blockquote/blockquote.twig';
import BlockquoteDocs from './blockquote.docs.md?raw';
import BlockquoteSource from '@components/blockquote/blockquote.twig?raw';

export default {
  title: 'Components/Blockquote',
  parameters: {
    componentSource: {
      code: BlockquoteSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: BlockquoteDocs,
      },
    },
  },
  argTypes: {
    blockquote_content: {
      name: 'blockquote_content',
      description: 'Simple html text from wysiwyg editor',
      control: {
        type: 'text',
      },
      type: {
        required: true,
      },
    },
    blockquote_footer: {
      name: 'blockquote_footer',
      description: 'Text for footer',
      control: {
        type: 'text',
      },
    },
    blockquote_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
  args: {
    blockquote_content: '<p>Nullam at felis ac lacus hendrerit ultricies.</p>',
    blockquote_footer: 'Someone famous in <cite title="Source Title">Source Title</cite>',
    blockquote_classes: [''],
  },
};

const Template = (args) => TwigBlockquote(args);

export const Default = Template.bind({});
