// import './_alert.scss';
import alertTemplate from '@components/alert/alert.twig';
import AlertDocs from './alert_drupal.docs.md?raw';
import AlertSource from '@components/alert/alert.twig?raw';

export default {
  title: 'Components/Alert/Alert Drupal',
  parameters: {
    componentSource: {
      code: AlertSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: AlertDocs,
      },
    },
  },
  args: {},
  argTypes: {
    message_list: {
      control: 'object',
      defaultValue: {
        info: ['This is an important text for the user to read'],
      },
    },
  },
};

const Template = (args) => alertTemplate(args);

export const InfoDrupal = Template.bind({});
InfoDrupal.args = {
  drupal: true,
  message_list: {
    info: ['This is an important text for the user to read.'],
  },
};

export const InfoMultipleDrupal = Template.bind({});
InfoMultipleDrupal.args = {
  drupal: true,
  message_list: {
    info: [
      'This is an important text for the user to read.',
      'This is the second important text for the user to read.',
    ],
  },
};

export const MultipleDrupal = Template.bind({});
MultipleDrupal.args = {
  drupal: true,
  message_list: {
    info: [
      'This is an important text for the user to read.',
      'This is the second important text for the user to read.',
    ],
    success: ['This is an success message.'],
  },
};

export const SuccessDrupal = Template.bind({});
SuccessDrupal.args = {
  drupal: true,
  message_list: {
    success: ['This is an success message.'],
  },
};

export const DangerDrupal = Template.bind({});
DangerDrupal.args = {
  drupal: true,
  message_list: {
    danger: ['This is an danger message.'],
  },
};

export const WarningDrupal = Template.bind({});
WarningDrupal.args = {
  drupal: true,
  message_list: {
    warning: ['This is an warning message.'],
  },
};

export const ErrorDrupal = Template.bind({});
ErrorDrupal.args = {
  drupal: true,
  message_list: {
    error: ['This is an error message.'],
  },
};
