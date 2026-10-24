import PaginationTemplate from '@components/pagination/pagination.twig';
import PaginationDocs from './pagination.docs.md?raw';
import PaginationSource from '@components/pagination/pagination.twig?raw';
import { constants } from '../_constants';

export default {
  title: 'Components/Pagination',
  parameters: {
    componentSource: {
      code: PaginationSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: PaginationDocs,
      },
    },
  },
  args: {},
  argTypes: {
    pagination_title: {
      control: 'text',
      type: {
        required: true,
      },
    },
    size: {
      description: '**options**',
      control: { type: 'radio' },
      options: constants.sizes.options,
      table: {
        type: {
          summary: constants.sizes.options.map((option) => `'${option}'`).join('|'),
        },
      },
    },
    pagination_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

const Template = (args) => PaginationTemplate(args);

export const Simple = Template.bind({});
Simple.args = {
  pagination_title: 'Search results pages',
  size: 'default',
  current: 2,
  items: {
    previous: {
      href: '#',
      text: '‹ Previous',
    },
    pages: {
      1: { href: '#' },
      2: { href: '#' },
      3: { href: '#' },
    },
    next: {
      href: '#',
      text: 'Next ›',
    },
  },
  pagination_classes: ['justify-center', 'mt-12'],
};

export const Full = Template.bind({});
Full.args = {
  pagination_title: 'Search results pages',
  size: 'default',
  current: 3,
  items: {
    first: {
      href: '#',
      text: '« First',
    },
    previous: {
      href: '#',
      text: '‹ Previous',
    },
    pages: {
      1: { href: '#' },
      2: { href: '#' },
      3: { href: '#' },
      4: { href: '#' },
      5: { href: '#' },
    },
    next: {
      href: '#',
      text: 'Next ›',
    },
    last: {
      href: '#',
      text: 'Last »',
    },
  },
  pagination_classes: ['justify-center', 'mt-12'],
};
