import buttonGroupTemplate from '@components/buttons-group/buttons-group.twig';
import ButtonGroupSource from '@components/buttons-group/buttons-group.twig?raw';

export default {
  title: 'Components/Button/Group',
  parameters: {
    componentSource: {
      code: ButtonGroupSource,
      language: 'twig',
    },
    controls: { disable: true },
  },
  argTypes: {
    content: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => buttonGroupTemplate(args);

export const Default = Template.bind({});
Default.args = {
  content:
    '<button type="button" class="btn btn-outline-primary">First action</button><button type="button" class="btn btn-outline-primary">Second action</button>',
};

export const DefaultThree = Template.bind({});
DefaultThree.args = {
  content:
    '<button type="button" class="btn btn-primary">First action</button><button type="button" class="btn btn-secondary">Second action</button><button type="button" class="btn btn-danger">Third action</button>',
};
