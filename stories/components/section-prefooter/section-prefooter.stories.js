import sectionPFTemplate from '@components/section-prefooter/section-prefooter.twig';
import sectionPFSource from '@components/section-prefooter/section-prefooter.twig?raw';

export default {
  title: 'Components/Section/Section pre-Footer',
  component: 'Section',
  parameters: {
    componentSource: {
      code: sectionPFSource,
      language: 'twig',
    },
    docs: {
      subtitle: 'This is the pre-footer section.',
      // description: {
      //   component: SectionPrefooterDocs,
      // },
    },
  },
  args: {},
  argTypes: {
    heading: {
      control: 'text',
      description: 'the heading (h1, hx) component.',
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

const Template = (args) => sectionPFTemplate(args);

export const Example = Template.bind({});
Example.args = {
  heading: '<h2 class="text-left">My section title</h2>',
  content:
    '<div class="w-full self-center md:w-1/2">   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>  <a href="https://example.com" class="btn btn-white btn-lg mt-2 shadow" title="Primary link title" target="_self">Main link color</a>   </div>    <div class="w-full mt-6 self-center md:w-1/2 md:mt-0"><img src="/img/stories/picsum/seed-picsum-1920x1080.jpg" width="1920" height="1080" class="h-auto max-w-full rounded shadow" alt="Descriptive Alt Text"></div>',
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
