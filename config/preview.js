/**
 * @file Storybook preview shared by storybook-tw-base and the projects using it.
 *
 * Usage in a project's .storybook/preview.js: see this repository's
 * .storybook/preview.js. storySort must be written there, as a literal:
 * Storybook reads it statically from that file and does not follow imports.
 */
// Styles and the JS bundle are loaded via config/preview-head.html to avoid
// MIME-type conflicts with Vite's module system.
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

const preview = {
  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },

    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        dark: { name: 'dark', value: '#000' },
      },
    },

    viewMode: 'docs',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;
