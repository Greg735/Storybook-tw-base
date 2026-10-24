// import './_alert.scss';
import ImagesGalleryTemplate from '@components/images-gallery/images-gallery.twig';
import ImagesGalleryDocs from './images-gallery.docs.md?raw';
import ImagesGallerySource from '@components/images-gallery/images-gallery.twig?raw';
import { expect, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Images Gallery',
  parameters: {
    componentSource: {
      code: ImagesGallerySource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ImagesGalleryDocs,
      },
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    gallery_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
    use_lightbox: {
      control: 'boolean',
      description: 'Use lightbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    gallery_spacing: {
      control: 'number',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    gallery_grid: {
      control: 'text',
      type: {
        required: true,
      },
    },
    items: {
      control: 'object',
      description: 'Array of image items',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

const Template = (args) => ImagesGalleryTemplate(args);

export const Default = Template.bind({});
Default.args = {
  gallery_classes: null,
  use_lightbox: false,
  gallery_spacing: 2,
  gallery_grid: 'w-1/2 sm:w-1/3 md:w-1/4',
  gallery_attributes: {
    'data-masonry': '{"percentPosition": true }',
  },
  items: [
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/1-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/1-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/2-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/2-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/3-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/3-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/4-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/4-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/5-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/5-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/6-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/6-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/7-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/7-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/8-800x600.jpg',
      width: 800,
      height: 600,
      lightbox_dest_image_src: '/img/stories/picsum/8-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
  ],
};

// Masonry positions the items absolutely once the behavior has run.
Default.play = async ({ canvasElement }) => {
  const grid = canvasElement.querySelector('.gallery-grid');
  await waitFor(() => expect(grid.firstElementChild.style.position).toBe('absolute'));
};

export const WithLightbox = Template.bind({});
WithLightbox.args = {
  ...Default.args,
  use_lightbox: true,
};

WithLightbox.play = async ({ canvasElement }) => {
  await userEvent.click(canvasElement.querySelector('a.glightbox'));
  // A single lightbox opens, even after other stories have been rendered.
  await waitFor(() => expect(document.querySelectorAll('.glightbox-container')).toHaveLength(1));
  await expect(document.activeElement).toHaveClass('gclose');

  await userEvent.click(document.activeElement);
  await waitFor(() => expect(document.documentElement).not.toHaveClass('glightbox-open'), { timeout: 3000 });
  // Focus goes back to the link that opened the lightbox.
  await expect(document.activeElement).toBe(canvasElement.querySelector('a.glightbox'));
};

export const WithAnimations = Template.bind({});
WithAnimations.args = {
  ...Default.args,
  use_lightbox: true,
  items: [
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/1-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/1-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/2-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/2-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/3-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/3-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/4-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/4-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/5-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/5-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/6-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/6-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/7-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/7-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
    {
      alt: 'Image alternative text',
      src: '/img/stories/picsum/8-800x600.jpg',
      width: 800,
      height: 600,
      image_attributes: { 'data-cue': 'fadeIn', 'data-duration': '1200' },
      lightbox_dest_image_src: '/img/stories/picsum/8-1920x1080.jpg',
      lightbox_caption: 'Title: Image title',
      lightbox_gallery: '',
    },
  ],
};
