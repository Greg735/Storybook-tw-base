import TwigColors from './colors.local.twig';
// import TwigAlertsColors from './colors.alerts.local.twig';
import ColorsDocs from './colors.docs.md?raw';

export default {
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      subtitle: 'System-wide color variables',
      description: {
        component: ColorsDocs,
      },
    },
    controls: { disable: true },
  },
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
    colors: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    columns: 'w-1/2',
    colors: [
      'color-primary',
      'color-secondary',
      'color-info',
      'color-info-subtle',
      'color-success',
      'color-success-subtle',
      'color-warning',
      'color-warning-subtle',
      'color-danger',
      'color-danger-subtle',
      'color-body-bg',
      'color-body',
    ],
  },
};

const Template = ({ columns, colors }) => TwigColors({ columns, colors });
export const MainColors = Template.bind({});

// const TemplateAlerts = ({ columns, colors }) => TwigAlertsColors({ columns, colors })

// TemplateAlerts.args = {
// 	columns: 'w-full',
// 	colors: [
// 		'color-primary-subtle',
// 	],
// }

export const ThemeColors = Template.bind({});
ThemeColors.args = {
  columns: 'w-full md:w-1/4',
  colors: [
    'color-blue',
    'color-green',
    'color-orange',
    'color-cyan',
    'color-red',
    'color-light',
    'color-dark',
    'color-indigo',
    'color-purple',
    'color-pink',
    'color-yellow',
    'color-teal',
    'color-black',
    'color-white',
    'color-gray',
    'color-gray-dark',
  ],
};

export const NeutralColors = Template.bind({});
NeutralColors.args = {
  columns: 'w-full',
  colors: [
    'color-black',
    'color-white',
    'color-gray',
    'color-gray-dark',
    'color-gray-100',
    'color-gray-200',
    'color-gray-300',
    'color-gray-400',
    'color-gray-500',
    'color-gray-600',
    'color-gray-700',
    'color-gray-800',
    'color-gray-900',
  ],
};

export const FunctionalColors = Template.bind({});
FunctionalColors.args = {
  columns: 'w-full sm:w-1/3',
  colors: [
    'color-blue',
    'color-indigo',
    'color-purple',
    'color-pink',
    'color-red',
    'color-orange',
    'color-yellow',
    'color-green',
    'color-teal',
    'color-cyan',
    'color-black',
    'color-white',
    'color-gray',
  ],
};
