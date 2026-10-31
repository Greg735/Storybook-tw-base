import CardDefaultTemplate from '@components/card/default/default.twig';
import CardDefaultSource from '@components/card/default/default.twig?raw';

export default {
  title: 'Components/Card/Default',
  parameters: {
    componentSource: {
      code: CardDefaultSource,
      language: 'twig',
    },
    docs: {
      description: {
        component:
          'Card with an optional image, a title, a text and a button. Built on `card`, the skeleton of the cards (`classes`, `card_attributes`, `content`).',
      },
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
    card_attributes: {
      control: 'object',
      description: 'HTML attributes of the card',
    },
  },
};

const Template = (args) => CardDefaultTemplate(args);

export const Default = Template.bind({});
Default.args = {
  title: 'Card title',
  text: 'Some quick example text to build on the card title.',
  link: { url: '#', label: 'Go somewhere' },
  classes: [],
};
