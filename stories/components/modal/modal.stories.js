import modalTemplate from '@components/modal/modal.twig';
import modalSource from '@components/modal/modal.twig?raw';
import { expect, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Modal',
  parameters: {
    componentSource: {
      code: modalSource,
      language: 'twig',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    modal_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
};

// The modal is hidden until opened: the story adds a button to open it.
const Template = (args) =>
  `<button type="button" class="btn btn-primary" data-modal-target="#${args.modal_id}">Open the modal</button>${modalTemplate(args)}`;

export const Modal = Template.bind({});
Modal.args = {
  modal_id: 'exempleModal',
  content: 'Modal',
  modal_classes: [''],
};

Modal.play = async ({ canvasElement }) => {
  const dialog = canvasElement.querySelector('dialog');
  await userEvent.click(canvasElement.querySelector('[data-modal-target]'));
  await waitFor(() => expect(dialog.open).toBe(true));
  await userEvent.click(dialog.querySelector('[data-modal-close]'));
  await waitFor(() => expect(dialog.open).toBe(false));
};
