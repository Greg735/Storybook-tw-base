import IntroTemplate from './introduction.local.twig';

const count = (modules) => Object.keys(modules).length;

export default {
  title: 'Documentation/Introduction',
  // Standalone page: no autodocs, no addon panel (see config/manager.js), and
  // the single story is hoisted in the sidebar because its name matches the
  // component name.
  tags: ['!autodocs', 'no-panel'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};

export const Introduction = {
  render: (args) => IntroTemplate(args),
  args: {
    stats: [
      { label: 'Components', value: count(import.meta.glob('../../components/**/*.stories.js')) },
      { label: 'Foundations', value: count(import.meta.glob('../../foundations/**/*.stories.js')) },
      { label: 'Utilities', value: count(import.meta.glob('../../utilities/**/*.stories.js')) },
      { label: 'Tailwind CSS', value: '4' },
    ],
    sections: [
      {
        id: 'foundations-typography',
        icon: 'palette',
        title: 'Foundations',
        text: 'Colors, typography, headings and forms: the design tokens everything else is built on.',
      },
      {
        id: 'components-button-button',
        icon: 'grid-1x2',
        title: 'Components',
        text: 'Reusable Twig components with their props, variants and live examples.',
      },
      {
        id: 'utilities-icons',
        icon: 'tools',
        title: 'Utilities',
        text: 'Icons, animations, tooltips and layout helpers to enhance any component.',
      },
      {
        // Foundations/Sections exists in every project, unlike the Section
        // component, whose title a project may change.
        id: 'foundations-sections',
        icon: 'layout-text-window',
        title: 'Sections',
        text: 'Page-level blocks that combine components into ready-to-use layouts.',
      },
    ],
    steps: [
      { title: 'Start the DDEV environment', command: 'ddev start' },
      { title: 'Install dependencies', command: 'ddev npm install' },
      { title: 'Start Storybook and the assets build', command: 'ddev npm run develop' },
      { title: 'Run the tests', command: 'ddev npm test' },
      { title: 'Build the static Storybook', command: 'ddev npm run build-storybook' },
    ],
    workflow: [
      {
        icon: 'filetype-html',
        title: 'Twig templates',
        text: 'Each component lives in <code>stories/components/</code> with its <code>.twig</code>, story and, when needed, <code>.css</code> (Tailwind utilities).',
      },
      {
        icon: 'filetype-css',
        title: 'Tailwind CSS + Vite',
        text: 'The Vite assets build compiles Tailwind CSS (the classes used by the templates and stories) and <code>*.behaviors.js</code> files into <code>public/</code> and <code>dist/</code>; Storybook reloads automatically.',
      },
      {
        icon: 'lightning-charge',
        title: 'Drupal behaviors',
        text: 'JavaScript is written as <code>Drupal.behaviors</code> with <code>once()</code>, so lightbox, masonry, map, animations and tooltips never initialise twice.',
      },
      {
        icon: 'check2-circle',
        title: 'Tests',
        text: 'Vitest runs every story in Playwright, with <code>play</code> interaction tests and accessibility checks (<code>addon-a11y</code>).',
      },
      {
        icon: 'box-seam',
        title: 'Drupal ready',
        text: 'Templates from <code>dist/components/</code> attach their Drupal library; the theme compiles its CSS from <code>dist/css/tailwind.css</code>.',
      },
    ],
  },
};
