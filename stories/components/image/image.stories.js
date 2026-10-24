import ImageTemplate from '@components/image/image.twig';
import ImageDocs from './image.docs.md?raw';
import ImageSource from '@components/image/image.twig?raw';

export default {
  title: 'Components/Image',
  parameters: {
    componentSource: {
      code: ImageSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ImageDocs,
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
        defaultValue: { summary: 640 },
      },
    },
    height: {
      control: 'number',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 480 },
      },
    },
    shadow: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    thumbnail: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    rounded: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    image_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
    picture_srcsets: {
      control: 'object',
      description: 'Array of objects with srcset and media for the <picture> tag',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

const Template = (args) => ImageTemplate(args);

export const Default = Template.bind({});
Default.args = {
  alt: 'Image alternative text',
  src: '/img/stories/picsum/32-640x480.jpg',
  shadow: false,
  thumbnail: false,
  rounded: false,
  width: 640,
  height: 480,
  image_classes: [''],
};

export const WithPictureSrcSets = Template.bind({});
WithPictureSrcSets.args = {
  ...Default.args,
  image_classes: ['w-full'],
  picture_srcsets: [
    { media: '(max-width: 575px)', srcset: '/img/stories/picsum/32-575x288.jpg' },
    { media: '(max-width: 767px)', srcset: '/img/stories/picsum/32-767x384.jpg' },
    { media: '(max-width: 991px)', srcset: '/img/stories/picsum/32-991x496.jpg' },
    { media: '(max-width: 1199px)', srcset: '/img/stories/picsum/32-936x468.jpg' },
    { media: '(max-width: 1399px)', srcset: '/img/stories/picsum/32-1116x558.jpg' },
  ],
};
