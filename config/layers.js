/**
 * @file Source layers: the project, then storybook-tw-base.
 *
 * A file found at the same path (relative to stories/ or public/) in the
 * project overrides the one of storybook-tw-base. When storybook-tw-base is
 * the project itself (its own Storybook), there is a single layer.
 *
 * A project can exclude storybook-tw-base components it does not use, in its
 * package.json:
 *
 *   "storybook-tw-base": { "exclude": ["modal", "card"] }
 *
 * Entries are component names (stories/components/<name>/) or paths relative
 * to stories/ ("utilities/tooltips"). Excluded storybook-tw-base files are
 * left out of the stories, dist/components, the component styles, the JS
 * bundle and the Drupal libraries (they still resolve for `@components/…`
 * imports). Project files are never excluded.
 *
 * The Drupal theme machine name, used in the `attach_library()` calls of the
 * distributed templates and in dist/libraries.yml, is set with:
 *
 *   "storybook-tw-base": { "library": "my_theme" }
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const baseRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Returns the excluded directories (relative to stories/) declared in the
 * project package.json.
 */
const readOptions = (projectRoot) => {
  const file = path.join(projectRoot, 'package.json');
  return (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8'))['storybook-tw-base'] : null) || {};
};

export const readExcludes = (projectRoot) => {
  return (readOptions(projectRoot).exclude || [])
    .map((entry) => entry.replace(/^\/+|\/+$/g, ''))
    .map((entry) => (entry.includes('/') ? entry : `components/${entry}`));
};

// Library namespace of the templates in storybook-tw-base itself.
export const DEFAULT_LIBRARY = 'storybook_tw_base';

/**
 * Returns the Drupal library namespace (theme machine name) of the project.
 */
export const readLibrary = (projectRoot) => readOptions(projectRoot).library || DEFAULT_LIBRARY;

/**
 * Returns the layers, highest priority first.
 *
 * `excluded(file)` tells whether `file` (relative to stories/) is excluded
 * from the layer: always false for the project.
 *
 * @param {string} projectRoot The project directory (defaults to the cwd).
 * @return {{name: string, root: string, stories: string, public: string, exclude: string[], excluded: function(string): boolean}[]}
 */
export const resolveLayers = (projectRoot = process.cwd()) => {
  const roots = [path.resolve(projectRoot)];
  if (roots[0] !== baseRoot) {
    roots.push(baseRoot);
  }
  const excludes = readExcludes(roots[0]);
  return roots.map((root, index) => {
    const exclude = index === 0 ? [] : excludes;
    return {
      name: index === 0 ? 'project' : 'base',
      root,
      stories: path.join(root, 'stories'),
      public: path.join(root, 'public'),
      exclude,
      excluded: (file) => exclude.some((dir) => file === dir || file.startsWith(`${dir}/`)),
    };
  });
};

/**
 * Returns the absolute path of `file` (relative to stories/) in the first
 * layer that has it, or null.
 *
 * Excludes are ignored here on purpose: a kept story or template may still
 * import an excluded component (the assets build warns about it).
 */
export const findInLayers = (layers, file) => {
  for (const layer of layers) {
    const candidate = path.join(layer.stories, file);
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
};
