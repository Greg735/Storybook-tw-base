import ImageLightboxTemplate from '@components/image-lightbox/image-lightbox.twig';
import ImageLightboxDocs from './image-lightbox.docs.md?raw';
import ImageLightboxSource from '@components/image-lightbox/image-lightbox.twig?raw';

export default {
  title: 'Components/Image/Image Lightbox',
  parameters: {
    componentSource: {
      code: ImageLightboxSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ImageLightboxDocs,
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
    image_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
    lightbox_dest_image_src: {
      control: 'text',
      type: {
        required: true,
      },
    },
    lightbox_caption: {
      control: 'text',
      type: {
        required: true,
      },
    },
    lightbox_gallery: {
      control: 'text',
    },
    lightbox_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

const Template = (args) => ImageLightboxTemplate(args);

export const Default = Template.bind({});
Default.args = {
  alt: 'Image alternative text',
  src: '/img/stories/picsum/666-400x400.jpg',
  width: 400,
  height: 400,
  image_classes: [''],
  lightbox_dest_image_src: '/img/stories/picsum/555-1920x1080.jpg',
  lightbox_caption: 'Title: Image title',
  lightbox_gallery: '',
  lightbox_classes: ['mb-5'],
};
