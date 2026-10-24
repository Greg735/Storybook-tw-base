import TwigDisplayHeadings from './display-headings.local.twig';
import DisplayHeadingsDocs from './display-headings.docs.md?raw';

export default {
  title: 'Foundations/Display headings',
  parameters: {
    docs: {
      subtitle: 'HTML display heading elements (h1-h6)',
      description: {
        component: DisplayHeadingsDocs,
      },
    },
  },
};

export const Example = (args) => TwigDisplayHeadings(args);
