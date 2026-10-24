// import './_alert.scss';
import ImageZoomTemplate from '@components/image-zoom/image-zoom.twig';
import ImageZoomDocs from './image-zoom.docs.md?raw';
import ImageZoomSource from '@components/image-zoom/image-zoom.twig?raw';

export default {
  title: 'Components/Image/Image Zoom',
  parameters: {
    componentSource: {
      code: ImageZoomSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ImageZoomDocs,
      },
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    alt: {
      control: 'text',
      type: {
        required: true,
      },
    },

    src: {
      control: 'text',
      type: {
        required: true,
      },
    },
    width: {
      control: 'number',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1920 },
      },
    },
    height: {
      control: 'number',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1080 },
      },
    },
    classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

const Template = (args) => ImageZoomTemplate(args);

export const Default = Template.bind({});
Default.args = {
  alt: 'Image alternative text',
  src: '/img/stories/picsum/391-1920x1080.jpg',
  width: 1920,
  height: 1080,
  classes: ['rounded'],
};
