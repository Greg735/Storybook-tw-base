import TwigTypography from './typography.local.twig';
import TypographyDocs from './typography.docs.md?raw';

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      subtitle: 'Typography used in website.',
      description: {
        component: TypographyDocs,
      },
    },
  },
};

export const Example = (args) => TwigTypography(args);
