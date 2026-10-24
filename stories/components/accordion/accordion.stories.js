import AccordionTemplate from '@components/accordion/accordion.twig';
import AccordionDocs from './accordion.docs.md?raw';
import AccordionSource from '@components/accordion/accordion.twig?raw';
import { expect, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Accordion',
  parameters: {
    componentSource: {
      code: AccordionSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: AccordionDocs,
      },
    },
  },
  args: {},
  argTypes: {
    accordion_id: { control: 'text' },
    items: {
      control: 'object',
      description: 'Array of accordion items with title, content, and optional open state',
      table: {
        type: { summary: 'object' },
      },
    },
    independent: {
      control: 'boolean',
      description: 'Allow accordions to be opened independently',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

const Template = (args) => AccordionTemplate(args);

export const Default = Template.bind({});
Default.args = {
  accordion_id: 'default',
  items: [
    { title: 'Accordion Item #1', content: 'This is the content of the first accordion item.', open: false },
    { title: 'Accordion Item #2', content: 'This is the content of the second accordion item.', open: false },
    { title: 'Accordion Item #3', content: 'This is the content of the third accordion item.', open: false },
  ],
  independent: false,
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  accordion_id: 'single',
  items: [{ title: 'Accordion Item #1', content: 'This is the content of the single accordion item.', open: true }],
  independent: false,
};

export const Independent = Template.bind({});
Independent.args = {
  accordion_id: 'independent',
  items: [
    { title: 'Accordion Item #1', content: 'This is the content of the first accordion item.', open: false },
    { title: 'Accordion Item #2', content: 'This is the content of the second accordion item.', open: false },
    { title: 'Accordion Item #3', content: 'This is the content of the third accordion item.', open: false },
  ],
  independent: true,
};

export const AllClosed = Template.bind({});
AllClosed.args = {
  accordion_id: 'allclosed',
  items: [
    { title: 'Accordion Item #1', content: 'This is the content of the first accordion item.', open: false },
    { title: 'Accordion Item #2', content: 'This is the content of the second accordion item.', open: false },
    { title: 'Accordion Item #3', content: 'This is the content of the third accordion item.', open: false },
  ],
  independent: false,
};

export const AllOpen = Template.bind({});
AllOpen.args = {
  accordion_id: 'allopen',
  items: [
    { title: 'Accordion Item #1', content: 'This is the content of the first accordion item.', open: true },
    { title: 'Accordion Item #2', content: 'This is the content of the second accordion item.', open: true },
    { title: 'Accordion Item #3', content: 'This is the content of the third accordion item.', open: true },
  ],
  independent: true,
};

export const MixedState = Template.bind({});
MixedState.args = {
  accordion_id: 'mixed',
  items: [
    { title: 'Accordion Item #1', content: 'This is the content of the first accordion item.', open: true },
    { title: 'Accordion Item #2', content: 'This is the content of the second accordion item.', open: false },
    { title: 'Accordion Item #3', content: 'This is the content of the third accordion item.', open: true },
  ],
  independent: false,
};

// Opening an item closes the open one (not independent).
MixedState.play = async ({ canvasElement }) => {
  const [first, second] = canvasElement.querySelectorAll('[data-accordion-trigger]');
  await userEvent.click(second);
  await waitFor(() => expect(second).toHaveAttribute('aria-expanded', 'true'));
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await waitFor(() => expect(canvasElement.querySelector('#collapsemixed1')).toHaveClass('hidden'));
  await expect(canvasElement.querySelector('#collapsemixed2')).not.toHaveClass('hidden');
};
