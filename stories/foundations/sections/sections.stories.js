import sectionTemplate from './sections.local.twig';
import sectionsDocs from './sections.docs.md?raw';
import sectionSource from './sections.local.twig?raw';

export default {
  title: 'Foundations/Sections',
  parameters: {
    docs: {
      subtitle:
        'Section is just a <section> with some parameters for design (class and background). Title is optional (h2 element) and the content is to be define.',
      description: {
        component: sectionsDocs,
      },
    },
    componentSource: {
      code: sectionSource,
      language: 'twig',
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    class: {
      control: 'text',
      description: 'Some classes.',
      type: {
        required: false,
      },
    },
    title: {
      control: 'text',
      description: 'My section title (h2).',
      type: {
        required: false,
      },
    },
    content: {
      control: 'text',
      description: 'Can contains html tags.',
      type: {
        required: true,
      },
    },
  },
};

const Template = (args) => sectionTemplate(args);

export const Example = Template.bind({});
Example.args = {
  class: 'text-bg-light p-12',
  title: 'My section title',
  content:
    '<div class="-mx-3 flex flex-wrap *:max-w-full *:shrink-0 *:px-3"><div class="w-full self-center md:w-1/2">   <p>Lorem ipsum dolor sit <a href="#">amet</a>, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>    </div>    <div class="w-full md:w-1/2">      <img src="/img/stories/picsum/seed-picsum-600x400.jpg" class="h-auto max-w-full rounded shadow" alt="Descriptive Alt Text"></div></div>',
};
Example.parameters = {
  docs: {
    description: {
      story: 'Example with a background light. 2 columns and image with shadow and rounded classes.',
    },
  },
};
