import carouselTwig from '@components/carousel/carousel.twig';
import CarouselDocs from './carousel.docs.md?raw';
import CarouselSource from '@components/carousel/carousel.twig?raw';
import { expect, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Carousel',
  parameters: {
    componentSource: {
      code: CarouselSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: CarouselDocs,
      },
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    indicators: { control: 'boolean', defaultValue: true },
    controls: { control: 'boolean', defaultValue: true },
    autoplay: { control: 'boolean', defaultValue: true },
    carousel_height: { control: 'number', defaultValue: null },
    carousel_id: { control: 'text', defaultValue: 'carouselExample' },
    carousel_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
    items: {
      control: 'object',
      defaultValue: [
        {
          src: '/img/stories/picsum/555-800x600.jpg',
          alt: 'First slide',
          html_content: '<h1 class="mt-12">First Slide</h1>',
        },
        {
          src: '/img/stories/picsum/554-800x600.jpg',
          alt: 'Second slide',
          caption: 'Second Slide Label',
          subcaption: 'Some representative placeholder content for the second slide.',
        },
        {
          src: '/img/stories/picsum/553-800x600.jpg',
          alt: 'Third slide',
          caption: 'Third Slide Label',
          subcaption: 'Some representative placeholder content for the third slide.',
        },
      ],
    },
  },
};

const Template = (args) => carouselTwig(args);

export const Default = Template.bind({});
Default.args = {
  indicators: true,
  controls: true,
  autoplay: true,
  carousel_id: 'carouselExample',
  carousel_classes: '',
  items: [
    {
      src: '/img/stories/picsum/555-800x600.jpg',
      alt: 'First slide',
      html_content: '<h1 class="mt-12">First Slide</h1>',
    },
    {
      src: '/img/stories/picsum/554-800x600.jpg',
      alt: 'Second slide',
      caption: 'Second Slide Label',
      subcaption: 'Some representative placeholder content for the second slide.',
    },
    {
      src: '/img/stories/picsum/553-800x600.jpg',
      alt: 'Third slide',
    },
  ],
};

export const FixedHeight = Template.bind({});
FixedHeight.args = {
  ...Default.args,
  carousel_height: 450,
  carousel_id: 'carouselExample2',
};

export const WithLightbox = Template.bind({});
WithLightbox.args = {
  ...Default.args,
  indicators: false,
  autoplay: false,
  carousel_id: 'carouselExample3',
  items: [
    {
      src: '/img/stories/picsum/555-800x600.jpg',
      lightbox_img: '/img/stories/picsum/555-3440x1440.jpg',
      alt: 'First slide',
    },
    {
      src: '/img/stories/picsum/554-800x600.jpg',
      lightbox_img: '/img/stories/picsum/554-3440x1440.jpg',
      alt: 'Second slide',
    },
    {
      src: '/img/stories/picsum/553-800x600.jpg',
      lightbox_img: '/img/stories/picsum/553-3440x1440.jpg',
      alt: 'Third slide',
    },
  ],
};

WithLightbox.play = async ({ canvasElement }) => {
  const items = canvasElement.querySelectorAll('[data-carousel-item]');
  await userEvent.click(canvasElement.querySelector('[data-carousel-next]'));
  await waitFor(() => expect(items[1]).toHaveAttribute('data-active'));
  await expect(items[0]).not.toHaveAttribute('data-active');
};
