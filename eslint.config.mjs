import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', 'public/css/', 'public/js/', 'storybook-static/', 'coverage/', 'backup/', '!.storybook'],
  },
  js.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    // Stories and Storybook config: ES modules bundled by Vite for the browser.
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
    },
  },
  {
    // Drupal behaviors: classic scripts (one Drupal library each, all of them
    // concatenated into sb-main.js for Storybook), relying on the globals of
    // core/drupal, core/once and vendors.
    files: ['stories/**/*.behaviors.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.browser,
        Drupal: 'readonly',
        once: 'readonly',
        GLightbox: 'readonly',
        L: 'readonly',
        Masonry: 'readonly',
        scrollCue: 'readonly',
      },
    },
  },
  {
    // Node-side config files.
    files: ['*.config.{js,mjs}', 'vite.*.mjs', '.storybook/main.js', 'config/**/*.{js,mjs}', 'packages/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettier,
];
