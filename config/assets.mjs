/**
 * @file Builds the theme assets.
 *
 *   npm run assets         one-off build
 *   npm run assets:watch   build, then rebuild on changes under stories/
 *
 * Usage in vite.assets.config.mjs (storybook-tw-base or a project using it):
 *
 *   import { defineAssetsConfig } from 'storybook-tw-base/assets';
 *   export default defineAssetsConfig();
 *
 * Behaviors, Twig templates, CSS sources, images and fonts are collected from
 * the layers (see layers.js): storybook-tw-base first, then the project, whose
 * files override the ones at the same path. Styles come from the project
 * stories/main.css: its stories/core.css (storybook-tw-base/stories/core.css,
 * the project tokens and components), then storybook-tw-base/stories/deps.css
 * and the project deps.
 *
 * Output (consumed by Storybook from public/ and by the Drupal theme from dist/):
 * - public/css/style.css: compiled Tailwind CSS for Storybook (classes found in
 *   the stories of every layer); also dist/css/style.css and style.min.css
 * - dist/css/tailwind.css + dist/css/src/: the CSS sources, for the Drupal theme
 *   to compile its own CSS (the entry scans dist/components)
 * - public/js/sb-main.js (+ .min.js), dist/js/sb-main.js (+ .min.js): vendors and
 *   *.behaviors.js concatenated as is (Storybook, or a theme that loads
 *   everything at once)
 * - dist/js/components/<name>.js, dist/js/vendor/<name>.js and dist/libraries.yml:
 *   one Drupal library per behavior, attached by the templates with
 *   attach_library()
 * - dist/components/: component Twig templates, relative includes rewritten to
 *   @components/, library namespace set to the theme's
 * - dist/img/, dist/favicons/, dist/css/fonts/ and public/css/fonts/: images, favicons and fonts
 *
 * Kept in its own config file (not vite.config.*) so Storybook's Vite does not load it.
 */
import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { optimize } from '@tailwindcss/node';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { minify } from 'terser';
import { glob } from 'tinyglobby';
import { defineConfig } from 'vite';

import { DEFAULT_LIBRARY, readLibrary, resolveLayers } from './layers.js';

const config = {
  stylesMain: 'stories/main.css',
  // Imports of storybook-tw-base CSS files by the project CSS
  // ('storybook-tw-base/stories/core.css'…), rewritten to the copied sources.
  stylesImport: /(['"])storybook-tw-base\/stories\/([^'"]+)\1/g,
  // Vendor libraries: JS (classic scripts exposing a global) and CSS (imported
  // by the component styles, copied to dist/css/src/vendor/ for the theme).
  vendors: {
    leaflet: { js: 'node_modules/leaflet/dist/leaflet.js', css: 'leaflet/dist/leaflet.css' },
    scrollcue: { js: 'node_modules/scrollcue/scrollCue.js', css: 'scrollcue/scrollCue.css' },
    glightbox: { js: 'node_modules/glightbox/dist/js/glightbox.js', css: 'glightbox/dist/css/glightbox.css' },
    masonry: { js: 'node_modules/masonry-layout/dist/masonry.pkgd.js' },
    'bootstrap-icons': { css: 'bootstrap-icons/font/bootstrap-icons.css' },
  },
  // Relative to stories/, in each layer.
  behaviors: ['foundations/**/*.behaviors.js', 'utilities/**/*.behaviors.js', 'components/**/*.behaviors.js'],
  twig: {
    base: 'components',
    patterns: ['**/*.twig', '!**/*.local.twig'],
  },
  bsIcons: 'node_modules/bootstrap-icons/font/fonts',
  public: {
    css: 'public/css',
    js: 'public/js',
    img: 'public/img',
    fonts: 'public/css/fonts',
  },
  dist: {
    root: 'dist',
    css: 'dist/css',
    cssSources: 'dist/css/src',
    js: 'dist/js',
    twig: 'dist/components',
    img: 'dist/img',
    favicons: 'dist/favicons',
    fonts: 'dist/css/fonts',
  },
  cache: 'node_modules/.cache/storybook-tw-base',
  watch: 'stories',
};

// Set by defineAssetsConfig().
let layers = [];
let library = DEFAULT_LIBRARY;

// Layers from the lowest priority (storybook-tw-base) to the project, so that
// project files are written last.
const bottomUp = () => [...layers].reverse();

const baseLayer = () => layers[layers.length - 1];
const projectLayer = () => layers[0];

// Runs `task` for each layer, one after the other.
const eachLayer = async (task) => {
  for (const layer of bottomUp()) {
    await task(layer);
  }
};

const write = async (file, contents) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents);
};

// Copies the files matching `patterns` under `base` to each destination, keeping
// their path relative to `base`.
const copyFiles = async (base, patterns, destinations, transform) => {
  const files = await glob(patterns, { cwd: base });
  await Promise.all(
    files.map(async (file) => {
      const source = path.join(base, file);
      if (transform) {
        const contents = transform(await readFile(source, 'utf8'), file);
        await Promise.all(destinations.map((dest) => write(path.join(dest, file), contents)));
      } else {
        await Promise.all(
          destinations.map(async (dest) => {
            await mkdir(path.dirname(path.join(dest, file)), { recursive: true });
            await cp(source, path.join(dest, file));
          }),
        );
      }
    }),
  );
};

// Removes the sub-directories of dist/ (files at its root are kept).
const cleanDist = async () => {
  if (!existsSync(config.dist.root)) {
    return;
  }
  const entries = await readdir(config.dist.root, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => rm(path.join(config.dist.root, entry.name), { recursive: true, force: true })),
  );
};

const collectBsIcons = () => copyFiles(config.bsIcons, ['*'], [config.public.fonts, config.dist.fonts]);

const collectFonts = () =>
  eachLayer((layer) => copyFiles(path.join(layer.public, 'css/fonts'), ['*/*'], [config.dist.fonts]));

// public/img/stories/ only holds the stories' demo images: not shipped to the theme.
const collectImages = () =>
  eachLayer((layer) => copyFiles(path.join(layer.public, 'img'), ['**/*', '!stories/**'], [config.dist.img]));

// public/favicons/ is optional (usually project-specific).
const collectFavicons = () =>
  eachLayer((layer) => copyFiles(path.join(layer.public, 'favicons'), ['**/*'], [config.dist.favicons]));

// Glob negations for the directories a layer excludes under `base`.
const excludedPatterns = (layer, base) =>
  layer.exclude.filter((dir) => dir.startsWith(`${base}/`)).map((dir) => `!${dir.slice(base.length + 1)}/**`);

// attach_library('storybook_tw_base/…') in the templates: the theme's namespace.
const setLibraryNamespace = (contents) =>
  library === DEFAULT_LIBRARY ? contents : contents.replaceAll(`'${DEFAULT_LIBRARY}/`, `'${library}/`);

const collectTwig = async () => {
  await eachLayer((layer) =>
    copyFiles(
      path.join(layer.stories, config.twig.base),
      [...config.twig.patterns, ...excludedPatterns(layer, config.twig.base)],
      [config.dist.twig],
      (contents) =>
        setLibraryNamespace(
          contents
            .replaceAll('"../../', '"@components/')
            .replaceAll("'../../", '"@components/')
            .replaceAll('"../', '"@components/')
            .replaceAll("'../", '"@components/')
            .replaceAll(".twig'", '.twig"'),
        ),
    ),
  );
  await warnExcludedIncludes();
};

// Warns about distributed templates that include an excluded component: Drupal
// would not find it in dist/components/.
const warnExcludedIncludes = async () => {
  const excluded = layers
    .flatMap((layer) => layer.exclude)
    .filter((dir) => dir.startsWith(`${config.twig.base}/`))
    .map((dir) => dir.slice(config.twig.base.length + 1));
  if (!excluded.length) {
    return;
  }
  for (const file of await glob('**/*.twig', { cwd: config.dist.twig })) {
    const contents = await readFile(path.join(config.dist.twig, file), 'utf8');
    for (const dir of excluded) {
      if (contents.includes(`@components/${dir}/`)) {
        console.warn(`  warning: ${file} includes the excluded component "${dir}"`);
      }
    }
  }
};

/*
 * Styles.
 *
 * stories/components/index.css and deps.css (and the same in stories/utilities/)
 * have one `@import './<name>/<name>.css';` (or `<name>.deps.css`) line per
 * component. In a project, the
 * storybook-tw-base lines are left out for the excluded components and for
 * the ones the project replaces (same file, e.g.
 * stories/components/badge/badge.css, imported by the project main.css; it can
 * still import the storybook-tw-base one to extend it).
 */
const INDEX_IMPORT = /^@import ['"]\.\/(([^/'"]+)\/[^'"]+)['"];?\s*$/;

const filterIndex = (contents, dir) => {
  const base = baseLayer();
  const project = projectLayer();
  return contents
    .split('\n')
    .filter((line) => {
      const match = line.match(INDEX_IMPORT);
      if (!match || base === project) {
        return true;
      }
      return !base.excluded(`${dir}/${match[2]}`) && !existsSync(path.join(project.stories, dir, match[1]));
    })
    .join('\n');
};

// The storybook-tw-base CSS file `file` (relative to stories/), with the
// filtered indexes.
const baseCss = async (file) => {
  const contents = await readFile(path.join(baseLayer().stories, file), 'utf8');
  const dir = path.dirname(file);
  return /\/(index|deps)\.css$/.test(file) ? filterIndex(contents, dir) : contents;
};

// Vendor CSS imports (`@import 'leaflet/dist/leaflet.css';`).
const vendorCss = Object.entries(config.vendors).filter(([, vendor]) => vendor.css);

/**
 * Writes the CSS sources of every layer to `dest`: the project ones at the
 * root, the storybook-tw-base ones in storybook-tw-base/ (unless it is the
 * project), the vendor ones in vendor/. Imports are made relative, so that the
 * tree compiles on its own (only tailwindcss needs to be installed).
 */
const writeCssSources = async (dest) => {
  const base = baseLayer();
  const project = projectLayer();
  const baseDir = base === project ? dest : path.join(dest, 'storybook-tw-base');
  const relativeImport = (from, to) => {
    const relative = path.relative(path.dirname(from), to).split(path.sep).join('/');
    return relative.startsWith('.') ? relative : `./${relative}`;
  };
  const rewrite = (contents, file) => {
    let result = contents.replaceAll(
      config.stylesImport,
      (match, quote, base) => `${quote}${relativeImport(file, path.join(baseDir, base))}${quote}`,
    );
    for (const [name, vendor] of vendorCss) {
      result = result.replaceAll(vendor.css, relativeImport(file, path.join(dest, 'vendor', `${name}.css`)));
    }
    return result;
  };

  const writeLayer = async (layer, dir, filter) => {
    const files = await glob(['**/*.css'], { cwd: layer.stories });
    await Promise.all(
      files
        .filter((file) => filter(file))
        .map(async (file) => {
          const contents =
            layer === base ? await baseCss(file) : await readFile(path.join(layer.stories, file), 'utf8');
          const target = path.join(dir, file);
          await write(target, rewrite(contents, target));
        }),
    );
  };

  await writeLayer(base, baseDir, (file) => !base.excluded(file));
  if (base !== project) {
    await writeLayer(project, dest, () => true);
  }
  await Promise.all(
    vendorCss.map(async ([name, vendor]) =>
      write(path.join(dest, 'vendor', `${name}.css`), await readFile(path.join('node_modules', vendor.css), 'utf8')),
    ),
  );
};

/**
 * Compiles stories/main.css with Tailwind, scanning the stories of every
 * layer, to style.css (+ minified), and writes the CSS sources and the Tailwind
 * entry of the Drupal theme to dist/css/.
 */
const compileStyles = async () => {
  // Storybook: the CSS sources in the cache, plus the stories as sources.
  const tree = path.resolve(config.cache, 'css');
  await rm(tree, { recursive: true, force: true });
  await writeCssSources(tree);
  const sources = layers.map((layer) => `@source '${layer.stories}';`).join('\n');
  const entry = path.join(tree, 'storybook.css');
  await write(entry, `@import './main.css';\n${sources}\n`);

  const from = path.resolve(config.public.css, 'style.css');
  const result = await postcss([
    tailwindcss({ base: process.cwd(), optimize: false, transformAssetUrls: false }),
  ]).process(await readFile(entry, 'utf8'), { from: entry, to: from, map: false });
  const css = optimize(result.css, { minify: false }).code;
  const minified = optimize(result.css, { minify: true }).code;

  // Drupal theme: the sources, and an entry that scans dist/components.
  await rm(config.dist.cssSources, { recursive: true, force: true });
  await writeCssSources(config.dist.cssSources);
  const drupalEntry = [
    '/*',
    ' * Tailwind entry for the Drupal theme (generated by the assets build).',
    ' *',
    ' *   @import "<path to dist>/css/tailwind.css";',
    ' *   @source "<path to the theme templates>";',
    ' *',
    ' * Font URLs are relative to dist/css/: write the compiled CSS there, or',
    ' * copy dist/css/fonts/ next to it.',
    ' */',
    "@import './src/main.css';",
    "@source '../components';",
    '',
  ].join('\n');

  await Promise.all([
    write(path.join(config.public.css, 'style.css'), css),
    write(path.join(config.dist.css, 'style.css'), css),
    write(path.join(config.dist.css, 'style.min.css'), minified),
    write(path.join(config.dist.css, 'tailwind.css'), drupalEntry),
  ]);
};

/*
 * JavaScript.
 */

// Behaviors by path relative to stories/: a project file replaces the
// storybook-tw-base one.
const collectBehaviors = async () => {
  const files = [];
  for (const pattern of config.behaviors) {
    const behaviors = new Map();
    for (const layer of bottomUp()) {
      for (const file of (await glob(pattern, { cwd: layer.stories })).filter((file) => !layer.excluded(file))) {
        behaviors.set(file, path.join(layer.stories, file));
      }
    }
    files.push(...[...behaviors.keys()].sort().map((file) => ({ file, source: behaviors.get(file) })));
  }
  return files;
};

// The Drupal library dependencies of a behavior, declared in its header:
//   * @drupal-dependencies leaflet, core/drupal.debounce
// Names without a slash are vendor libraries of this build (vendor-<name>).
const behaviorDependencies = (contents) => {
  const match = contents.match(/@drupal-dependencies\s+([^\n*]+)/);
  return match
    ? match[1]
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
    : [];
};

const libraryName = (file) => path.basename(file, '.behaviors.js');

// Drupal libraries (dist/libraries.yml), to copy into <theme>.libraries.yml.
const librariesYml = (behaviors) => {
  const lines = [
    '# Drupal libraries of the components (generated by the assets build).',
    `# Copy them into ${library}.libraries.yml: the templates attach them with`,
    `# {{ attach_library('${library}/<name>') }}. Paths are relative to the theme`,
    '# root, assuming dist/ is at its root.',
  ];
  for (const [name, vendor] of Object.entries(config.vendors).filter(([, vendor]) => vendor.js)) {
    lines.push('', `vendor-${name}:`, '  js:', `    dist/js/vendor/${path.basename(vendor.js)}: {}`);
  }
  for (const behavior of behaviors) {
    const dependencies = [
      'core/drupal',
      'core/once',
      ...behavior.dependencies.map((dep) => (dep.includes('/') ? dep : `${library}/vendor-${dep}`)),
    ];
    lines.push(
      '',
      `${behavior.name}:`,
      '  js:',
      `    dist/js/components/${behavior.name}.js: {}`,
      '  dependencies:',
      ...dependencies.map((dep) => `    - ${dep}`),
    );
  }
  return `${lines.join('\n')}\n`;
};

// Concatenates vendors and behaviors to sb-main.js (+ minified), and writes one
// file per behavior and vendor with the Drupal libraries.
const compileJs = async () => {
  const behaviors = await Promise.all(
    (await collectBehaviors()).map(async ({ file, source }) => {
      const contents = await readFile(source, 'utf8');
      return { name: libraryName(file), contents, dependencies: behaviorDependencies(contents) };
    }),
  );
  const vendors = Object.values(config.vendors).filter((vendor) => vendor.js);
  const vendorJs = await Promise.all(vendors.map((vendor) => readFile(vendor.js, 'utf8')));
  const js = [...vendorJs, ...behaviors.map((behavior) => behavior.contents)].join('\n');
  const { code } = await minify(js);

  await rm(path.join(config.dist.js, 'components'), { recursive: true, force: true });
  await Promise.all([
    ...[config.public.js, config.dist.js].flatMap((dir) => [
      write(path.join(dir, 'sb-main.js'), js),
      write(path.join(dir, 'sb-main.min.js'), code),
    ]),
    ...vendors.map((vendor, index) =>
      write(path.join(config.dist.js, 'vendor', path.basename(vendor.js)), vendorJs[index]),
    ),
    ...behaviors.map((behavior) =>
      write(path.join(config.dist.js, 'components', `${behavior.name}.js`), behavior.contents),
    ),
    write(path.join(config.dist.root, 'libraries.yml'), librariesYml(behaviors)),
  ]);
};

const tasks = {
  styles: compileStyles,
  js: compileJs,
  twig: collectTwig,
};

// Which tasks a changed file under stories/ triggers. Classes live in the
// templates and stories, so they also rebuild the styles.
const tasksFor = (file) => {
  if (file.endsWith('.css')) {
    return ['styles'];
  }
  if (file.endsWith('.behaviors.js')) {
    return ['js', 'styles'];
  }
  if (file.endsWith('.twig') && !file.endsWith('.local.twig')) {
    return ['twig', 'styles'];
  }
  if (/\.(twig|js|md)$/.test(file)) {
    return ['styles'];
  }
  return [];
};

const themeAssets = () => {
  const virtualId = '\0theme-assets';
  let firstBuild = true;
  const dirty = new Set();

  const run = async (name, task) => {
    const start = Date.now();
    await task();
    console.log(`  ${name} (${Date.now() - start} ms)`);
  };

  return {
    name: 'theme-assets',
    resolveId: (id) => (id === 'virtual:theme-assets' ? virtualId : null),
    load: (id) => (id === virtualId ? 'export {}' : null),

    watchChange(id) {
      for (const task of tasksFor(id)) {
        dirty.add(task);
      }
    },

    // Nothing to emit: the assets are written by the tasks above. Vite writes
    // the bundle in watch mode even with build.write disabled.
    generateBundle(options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        delete bundle[fileName];
      }
    },

    async buildStart() {
      this.addWatchFile(path.resolve(config.watch));

      if (firstBuild) {
        firstBuild = false;
        await run('clean dist', cleanDist);
        await Promise.all([
          run('bootstrap icons', collectBsIcons),
          run('fonts', collectFonts),
          run('images', collectImages),
          run('favicons', collectFavicons),
          ...Object.entries(tasks).map(([name, task]) => run(name, task)),
        ]);
        return;
      }

      const names = [...dirty];
      dirty.clear();
      await Promise.all(names.map((name) => run(name, tasks[name])));
    },
  };
};

/**
 * @param {object} options
 * @param {string} options.projectRoot The project directory (defaults to the cwd).
 */
export const defineAssetsConfig = ({ projectRoot = process.cwd() } = {}) => {
  layers = resolveLayers(projectRoot);
  library = readLibrary(projectRoot);
  return defineConfig({
    // Nothing to serve: public/ is Storybook's static dir, not this build's.
    publicDir: false,
    logLevel: 'warn',
    plugins: [themeAssets()],
    build: {
      // The plugin writes the assets itself; the bundle is an empty entry.
      write: false,
      // Never the default dist/, which is the theme output.
      outDir: 'node_modules/.cache/vite-assets',
      emptyOutDir: false,
      rollupOptions: {
        input: 'virtual:theme-assets',
        onwarn(warning, warn) {
          if (warning.code !== 'EMPTY_BUNDLE') {
            warn(warning);
          }
        },
      },
    },
  });
};
