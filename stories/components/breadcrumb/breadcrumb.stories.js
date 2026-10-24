import BreadcrumbTemplate from '@components/breadcrumb/breadcrumb.twig';
import BreadcrumbDocs from './breadcrumb.docs.md?raw';
import BreadcrumbSource from '@components/breadcrumb/breadcrumb.twig?raw';
import { constants } from '../_constants';

export default {
  title: 'Components/Breadcrumb',
  parameters: {
    docs: {
      description: {
        component: BreadcrumbDocs,
      },
    },
    componentSource: {
      code: BreadcrumbSource,
      language: 'twig',
    },
  },
  args: {},
  argTypes: {
    icon_name: {
      control: {
        type: 'select',
      },
      defaultValue: '',
      options: constants.icons_home.options,
      description: '**Options**',
      table: {
        require: 'false',
        type: {
          summary: constants.icons_home.options.map((option) => `'${option}'`).join('|'),
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    breadcrumb_title: {
      control: 'text',
      description: 'Visually hidden heading of the breadcrumb (pass a translated string from Drupal)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
    breadcrumb: {
      control: 'object',
      description: 'Array of breadcrumb items with text and optional URL',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

const Template = (args) => BreadcrumbTemplate(args);

export const Default = Template.bind({});
Default.args = {
  breadcrumb: [
    { text: 'Home', url: '/' },
    { text: 'Library', url: '/library' },
    { text: 'Data', url: '/library/data' },
    { text: 'Current Page' },
  ],
};
Default.parameters = {
  docs: {
    description: {
      story: 'Displays a breadcrumb with multiple items, some with links and some without.',
    },
  },
};

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  ...Default.args,
  icon_name: 'house-door',
};
DefaultWithIcon.parameters = {
  docs: {
    description: {
      story: 'Displays a breadcrumb with multiple items, some with links, some without and an icon before.',
    },
  },
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  breadcrumb: [{ text: 'Home', url: '/' }],
};
SingleItem.parameters = {
  docs: {
    description: {
      story: 'Displays a breadcrumb with a single item.',
    },
  },
};

export const WithoutLinks = Template.bind({});
WithoutLinks.args = {
  breadcrumb: [{ text: 'Home' }, { text: 'Library' }, { text: 'Data' }, { text: 'Current Page' }],
};
WithoutLinks.parameters = {
  docs: {
    description: {
      story: 'Displays a breadcrumb with multiple items, none of which are links.',
    },
  },
};
