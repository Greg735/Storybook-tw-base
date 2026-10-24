import CardTemplate from '@components/card/card.twig';
import CardSource from '@components/card/card.twig?raw';

export default {
  title: 'Components/Card',
  parameters: {
    componentSource: {
      code: CardSource,
      language: 'twig',
    },
  },
  argTypes: {
    title: {
      description: 'The card title',
      control: { type: 'text' },
    },
    text: {
      description: 'The card text',
      control: { type: 'text' },
    },
    classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

const Template = (args) => CardTemplate(args);

export const Default = Template.bind({});
Default.args = {
  title: 'Card title',
  text: 'Some quick example text to build on the card title.',
  link: { url: '#', label: 'Go somewhere' },
  classes: [],
};
