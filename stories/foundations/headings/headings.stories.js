import TwigHeadings from './headings.local.twig';
import HeadingsDocs from './headings.docs.md?raw';

export default {
  title: 'Foundations/Headings',
  parameters: {
    docs: {
      subtitle: 'HTML heading elements (h1-h6)',
      description: {
        component: HeadingsDocs,
      },
    },
  },
};

export const Example = (args) => TwigHeadings(args);
