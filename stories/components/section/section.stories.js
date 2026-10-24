import sectionTemplate from '@components/section/section.twig';
import sectionDocs from './section.docs.md?raw';
import sectionSource from '@components/section/section.twig?raw';

export default {
  title: 'Components/Section/Section',
  parameters: {
    componentSource: {
      code: sectionSource,
      language: 'twig',
    },
    docs: {
      subtitle:
        'Section is just a <section> with some parameters for design (class and background). Title is optional (h2 element) and the content is to be define.',
      description: {
        component: sectionDocs,
      },
    },
  },
  args: {},
  argTypes: {
    classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
    heading: {
      control: 'text',
      description: 'the heading (h1, hx) component.',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'html',
        },
      },
    },
    content: {
      control: 'text',
      description: '',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'html',
        },
      },
    },
    background_image: {
      control: 'text',
      description: 'add image url.',
      type: {
        required: false,
      },
    },
  },
};

const Template = (args) => sectionTemplate(args);

export const Example = Template.bind({});
Example.args = {
  classes: ['relative', 'p-12', 'bg-secondary', 'text-white', 'bg-gradient'],
  heading: '<h2 class="text-left text-h1">My section title</h2>',
  content:
    '<div class="w-full md:w-1/2">   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>  <a href="https://example.com" class="btn btn-white btn-lg mt-2 shadow" title="Primary link title" target="_self">Main link color</a>   </div>    <div class="w-full mt-6 md:w-1/2 md:mt-0">      <img src="/img/stories/picsum/seed-picsum-1920x1080.jpg" width="1920" height="1080" class="h-auto max-w-full rounded shadow" alt="Descriptive Alt Text"></div>',
  background_image: '',
};
Example.parameters = {
  // backgrounds: { default: 'dark' },
  backgrounds: {
    values: [
      { name: 'light', value: '#fff' },
      { name: 'dark', value: '#333' },
    ],
  },
  docs: {
    description: {
      story: 'Example with a background light. 2 columns and image with shadow and rounded classes.',
    },
  },
};
