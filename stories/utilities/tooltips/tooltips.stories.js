import tooltipsTemplate from './tooltips.local.twig';
import tooltipsDocs from './tooltips.docs.md?raw';

export default {
  title: 'Utilities/Tooltips',
  parameters: {
    docs: {
      description: {
        component: tooltipsDocs,
      },
    },
  },
  tags: ['autodocs'],
  args: {},
};

export const HTMLExample = (args) => tooltipsTemplate(args);
