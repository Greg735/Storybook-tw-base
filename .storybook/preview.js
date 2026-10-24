import preview from '../config/preview.js';

// storySort and tags are kept here as literals: Storybook reads them
// statically from this file, without following imports.
/** @type { import('@storybook/html-vite').Preview } */
export default {
  ...preview,
  parameters: {
    ...preview.parameters,

    options: {
      storySort: {
        // Sub-menus (components, stories of utilities…) in alphabetical order.
        method: 'alphabetical',
        order: ['Documentation', 'Foundations', ['headings', '*'], 'Utilities', 'Components', '*'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};
