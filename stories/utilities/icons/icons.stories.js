import TwigIcons from './icons.local.twig';
import IconsDocs from './icons.docs.md?raw';

export default {
  title: 'Utilities/Icons',
  parameters: {
    docs: {
      description: {
        component: IconsDocs,
      },
    },
    controls: { disable: true },
  },
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    name: ['text-paragraph'],
  },
};

const Template = ({ name }) => TwigIcons({ name });

export const ParagraphIcon = Template.bind({});

export const BootstrapIcon = Template.bind({});
BootstrapIcon.args = {
  name: ['bootstrap'],
};
