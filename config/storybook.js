/**
 * @file Storybook helpers shared by storybook-tw-base and the projects using it.
 *
 * Usage in a project's .storybook/main.js:
 *
 *   import { defineStorybookConfig } from 'storybook-tw-base/storybook';
 *   export default defineStorybookConfig({ hosts: ['my-project.ddev.site'] });
 *
 * Templates are resolved through the layers (see layers.js): a project file at
 * stories/components/<path> overrides the storybook-tw-base one, both for
 * `@components/…` Twig includes and for `@components/…` imports in stories.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { glob } from 'tinyglobby';

import { baseRoot, findInLayers, resolveLayers } from './layers.js';

const STORIES = '**/*.stories.@(js|jsx|ts|tsx)';
const STORIES_GLOB = '**/*.stories.{js,jsx,ts,tsx}';
const COMPONENTS = /^@components\/([^?]+)(\?.*)?$/;

/**
 * Story specifiers: every project story, plus the storybook-tw-base stories the
 * project neither overrides (same path under stories/) nor excludes.
 */
export const storybookStories = async (layers, configDir) => {
  const [project, ...others] = layers;
  const specifiers = [{ directory: path.relative(configDir, project.stories), files: STORIES }];
  const overridden = new Set(await glob(STORIES_GLOB, { cwd: project.stories }));

  for (const layer of others) {
    const files = await glob(STORIES_GLOB, { cwd: layer.stories });
    specifiers.push(
      ...files
        .filter((file) => !overridden.has(file) && !layer.excluded(file))
        .sort()
        .map((file) => path.relative(configDir, path.join(layer.stories, file))),
    );
  }
  return specifiers;
};

/**
 * Static dirs: the project public/ (generated CSS and JS), then the
 * storybook-tw-base images and fonts.
 */
export const storybookStaticDirs = (layers, configDir) => {
  const [project, ...others] = layers;
  const relative = (dir) => path.relative(configDir, dir);
  return [
    relative(project.public),
    ...others.flatMap((layer) => [
      { from: relative(path.join(layer.public, 'img')), to: '/img' },
      { from: relative(path.join(layer.public, 'css/fonts')), to: '/css/fonts' },
    ]),
    { from: relative(path.join(baseRoot, 'stories/assets')), to: '/assets' },
  ];
};

// Tags of the storybook-tw-base stories shown in a project (see manager.js).
export const BASE_TAG = 'storybook-tw-base';
export const OVERRIDDEN_TAG = 'storybook-tw-base-overridden';

// Project files that change how a storybook-tw-base story renders: templates
// (resolved through `@components/…`), replacing CSS files and behaviors.
const OVERRIDING_FILES = ['**/*.twig', '!**/*.local.twig', '**/*.css', '**/*.behaviors.js'];

/**
 * The origin tag of a story file: BASE_TAG for a storybook-tw-base story,
 * OVERRIDDEN_TAG when the project also overrides files of its directory
 * (e.g. stories/components/paragraph/paragraph.twig), null for a project story.
 */
export const storyOriginTag = async (layers, fileName) => {
  const [project, ...others] = layers;
  const file = path.resolve(fileName);
  const layer = others.find((other) => file.startsWith(other.stories + path.sep));
  if (!layer) {
    return null;
  }
  const dir = path.join(project.stories, path.dirname(path.relative(layer.stories, file)));
  const overriding = await glob(OVERRIDING_FILES, { cwd: dir });
  return overriding.length ? OVERRIDDEN_TAG : BASE_TAG;
};

/**
 * Wraps the story indexers to tag the storybook-tw-base stories with their origin
 * (no tag in storybook-tw-base's own Storybook, which has a single layer).
 */
export const storybookIndexers = (layers) => async (existing) =>
  layers.length < 2
    ? existing
    : existing.map((indexer) => ({
        ...indexer,
        createIndex: async (fileName, options) => {
          const entries = await indexer.createIndex(fileName, options);
          const tag = await storyOriginTag(layers, fileName);
          return tag ? entries.map((entry) => ({ ...entry, tags: [...(entry.tags || []), tag] })) : entries;
        },
      }));

// Global CSS/JS and the Drupal.behaviors / once() shim.
export const storybookPreviewHead = (head = '') =>
  `${head}\n${readFileSync(path.join(baseRoot, 'config/preview-head.html'), 'utf8')}`;

/**
 * Makes `@components/…` Twig includes resolve through the layers.
 *
 * vite-plugin-twig-drupal resolves includes with Twig.path.expandNamespace()
 * at build time (Node). In the browser, templates are registered under their
 * include name, so no path resolution happens there.
 */
const layeredTwigNamespaces = async (layers) => {
  const { default: Twig } = await import('twig');
  const expandNamespace = Twig.path.expandNamespace.__original || Twig.path.expandNamespace;
  Twig.path.expandNamespace = (namespaces, file) => {
    const match = file.match(COMPONENTS);
    const found = match && findInLayers(layers, `components/${match[1]}`);
    return found || expandNamespace(namespaces, file);
  };
  Twig.path.expandNamespace.__original = expandNamespace;
};

export const storybookViteFinal = async (config, { layers, hosts = [] }) => {
  const { mergeConfig } = await import('vite');
  const { default: twigDrupal } = await import('vite-plugin-twig-drupal');
  await layeredTwigNamespaces(layers);

  return mergeConfig(config, {
    // twig is CommonJS and only imported by the compiled templates, which
    // Vite's dependency scan does not see: pre-bundle it explicitly.
    optimizeDeps: {
      include: ['twig'],
    },
    plugins: [
      twigDrupal({
        // Exclude ?raw imports so Vite's built-in raw handling takes over
        pattern: /\.twig$/,
      }),
      {
        // `import x from '@components/…'` (and `?raw`) in stories: the project
        // file if it exists, else the storybook-tw-base one.
        name: 'storybook:layered-components',
        enforce: 'pre',
        resolveId(id) {
          const match = id.match(COMPONENTS);
          const found = match && findInLayers(layers, `components/${match[1]}`);
          return found ? found + (match[2] || '') : null;
        },
      },
      {
        // twig.js only uses "path" in its Node file loader, never reached in the
        // browser (templates are precompiled). Resolve it to an empty module, as
        // twig already does for "fs" via its "browser" field.
        name: 'storybook:twig-browser-path',
        enforce: 'pre',
        resolveId(id, importer) {
          return id === 'path' && importer?.includes('/node_modules/twig/') ? '\0twig-browser-path' : null;
        },
        load(id) {
          return id === '\0twig-browser-path' ? 'export default {};' : null;
        },
      },
      {
        name: 'storybook:assets-css-reload',
        configureServer(server) {
          server.watcher.add('./public/css/style.css');
          server.watcher.on('change', (file) => {
            if (file.includes('style.css')) {
              server.ws.send({ type: 'full-reload' });
            }
          });
        },
      },
    ],
    server: {
      allowedHosts: hosts,
    },
  });
};

/**
 * The whole Storybook main config. `overrides` is merged last.
 *
 * @param {object} options
 * @param {string[]} options.hosts Hosts allowed by the dev server (DDEV).
 * @param {string} options.configDir The .storybook directory.
 * @param {string} options.projectRoot The project directory.
 */
export const defineStorybookConfig = ({
  hosts = [],
  configDir = path.resolve('.storybook'),
  projectRoot = process.cwd(),
  ...overrides
} = {}) => {
  const layers = resolveLayers(projectRoot);
  return {
    stories: () => storybookStories(layers, configDir),
    experimental_indexers: storybookIndexers(layers),
    staticDirs: storybookStaticDirs(layers, configDir),
    previewHead: storybookPreviewHead,
    addons: ['@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-vitest'],
    docs: {
      // set to change the name of generated docs entries
      defaultName: 'Docs',
    },
    framework: {
      name: '@storybook/html-vite',
      options: {},
    },
    core: {
      allowedHosts: hosts,
    },
    viteFinal: (config) => storybookViteFinal(config, { layers, hosts }),
    ...overrides,
  };
};
