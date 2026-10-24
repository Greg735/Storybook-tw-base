// import './_alert.scss';
import IconTemplate from '@components/icon/icon.twig';
import IconDocs from './icon.docs.md?raw';
import IconSource from '@components/icon/icon.twig?raw';
import { constants } from '../_constants';

export default {
  title: 'Components/Icon',
  parameters: {
    componentSource: {
      code: IconSource,
      language: 'twig',
    },
    docs: {
      subtitle: 'An element used to display an icon',
      description: {
        component: IconDocs,
      },
    },
  },
  argTypes: {
    icon_name: {
      control: {
        type: 'select',
      },
      defaultValue: 'vignette',
      options: constants.icons_all.options,
      description: '**Options**',
      table: {
        require: 'false',
        type: {
          summary: constants.icons_all.options.map((option) => `'${option}'`).join('|'),
        },
        defaultValue: { summary: 'vignette' },
      },
    },
    size: {
      description: 'Size of the icon',
      table: { defaultValue: { summary: 'medium' } },
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large', 'x-large'],
    },
  },
  args: {
    icon_name: 'bootstrap',
    size: 'medium',
  },
};

const Template = ({ icon_name, size, cssClass }) => IconTemplate({ icon_name, size, cssClass });

export const Icon = Template.bind({});
