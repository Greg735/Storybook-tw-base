# AGENTS.md

## Purpose

This repository (`storybook-tw-base`) is a **Storybook 10** workspace for building and documenting UI components with:

- **Storybook HTML + Vite**
- **Twig** templates
- **Tailwind CSS 4** (utility classes in the templates, design tokens in `@theme`)
- **Vite** for asset generation (`config/assets.mjs`)
- **Vanilla Drupal behaviors** for the interactive components (no Bootstrap JS)

It is the Tailwind version of storybook-base: same components, same Twig variables, same design. It is also a **versioned npm package**: Drupal theme projects install it (`"storybook-tw-base": "github:Greg735/storybook-tw-base#vX.Y.Z"`), reuse its components and override them. See [Used as a package](#used-as-a-package).

Agents working in this repository should preserve the current Storybook + Twig + Tailwind + Vite assets workflow and avoid introducing alternative build systems unless explicitly requested.

---

## Stack Summary

### Core tools

- Storybook framework: `@storybook/html-vite`
- Stories: `*.stories.js`
- Template engine: `twig`
- Twig Vite integration: `vite-plugin-twig-drupal`
- Drupal Twig helpers: local package `packages/drupal-twig-extensions` (replaces the npm package, see Twig Rules)
- CSS pipeline: `tailwindcss` 4 through `@tailwindcss/postcss`, then `optimize()` from `@tailwindcss/node` (Lightning CSS: prefixes, minification)
- JS pipeline: plain concatenation + `terser`
- Icons: `bootstrap-icons` (icon font only; there is no Bootstrap CSS or JS)

### Important config files

- `package.json`
- `config/assets.mjs` (assets build, used through `vite.assets.config.mjs`)
- `config/storybook.js` (Storybook main config, used by `.storybook/main.js`)
- `config/preview.js` (used by `.storybook/preview.js`)
- `config/preview-head.html`
- `config/layers.js` (project → storybook-tw-base file resolution, `exclude` and `library` options)
- `stories/core.css`, `stories/deps.css`, `stories/tailwind.css` (design system entries) and `stories/main.css` (Storybook entry)
- `.storybook/manager.js`
- `.storybook/MyTheme.js`

---

## Source of Truth

### Edit source files here

- `stories/components/`
- `stories/foundations/`
- `stories/utilities/`
- `stories/documentation/`
- `stories/core.css`, `stories/deps.css`, `stories/tailwind.css`, `stories/main.css`
- `.storybook/`
- `config/`
- `packages/`
- `vite.assets.config.mjs`

### Generated output — do not edit manually

- `public/css/`
- `public/js/`
- `dist/`
- `storybook-static/`

If you need to change runtime output, modify the source under `stories/` or the relevant build config, then rebuild.

Demo images used by stories live in `public/img/stories/` (local copies, no external URLs such as picsum.photos) and are not copied to `dist/`. They are still served to the projects' Storybook (`/img` static dir).

---

## Development Commands

**Always run Node/npm commands through DDEV** (`ddev npm …`, `ddev npx …`). The DDEV web container provides the expected Node version (`nodejs_version: "22"` in `.ddev/config.yaml`) and the Playwright/Chromium dependencies used by the Vitest browser tests. The host's `node`/`npm` is not reliable (it may point to an old nvm version, e.g. Node 11, on which `npm audit` and the toolchain fail).

If the containers are not running, start them with `ddev start`. The DDEV project is `storybook-tw-base`; Storybook is served at `https://storybook-tw-base.ddev.site:6008` (container port 6006).

### Install

```bash
ddev npm install
```

### Start Storybook + assets watch

```bash
ddev npm run develop
```

### Start only Storybook

```bash
ddev npm run storybook
```

### Build assets only

```bash
ddev npm run assets        # one-off build
ddev npm run assets:watch  # build, then rebuild on changes
```

### Build static Storybook

```bash
ddev npm run build-storybook
```

### Run tests

```bash
ddev npm test
```

### Lint and format

```bash
ddev npm run lint     # ESLint + Prettier check (run in CI)
ddev npm run format   # Prettier --write
```

Prettier ignores `*.twig` and `*.md`. Use `parameters.docs.subtitle` in stories (not the removed `componentSubtitle`), and PascalCase story exports.

### Security audit

```bash
ddev npm audit
```

---

## Storybook Notes

### Current behavior

- Stories are loaded from `stories/**/*.stories.js`
- `.twig` files are processed by `vite-plugin-twig-drupal` (Drupal Twig extensions from `packages/drupal-twig-extensions`)
- Component templates are imported through the `@components/` alias, never relatively: `import template from '@components/youtube/youtube.twig'` (and `?raw`). This is what lets a project override the template of a storybook-tw-base story
- Raw sources (Twig, docs) are imported with Vite's `?raw` suffix, e.g. `import Docs from './x.docs.md?raw'`
- Global assets are loaded in `config/preview-head.html` (`previewHead`) from `public/` (served as static dir):
  - `/css/style.css`
  - `/js/sb-main.js` (every vendor and behavior)
- `preview-head.html` also provides a minimal `Drupal.behaviors` / `once()` shim, so `*.behaviors.js` run as in Drupal

### Consequence

Storybook depends on the generated assets existing in `public/`. If Storybook starts but styling or JS behavior is missing, run `ddev npm run assets` or use the combined development command. A class added to a template or story only exists once the styles are rebuilt (the watcher does it).

---

## Twig Rules

### Current integration

Twig is compiled by `vite-plugin-twig-drupal`, configured in `config/storybook.js` (`storybookViteFinal`).

### Guidance

- Preserve compatibility between `twig` and `vite-plugin-twig-drupal`
- `drupal-twig-extensions` is a **local package** (`packages/drupal-twig-extensions/twig.js`), wired through an npm `overrides` entry: `vite-plugin-twig-drupal` imports `drupal-twig-extensions/twig`, but the npm package pulls in a vulnerable `locutus@2`. It only registers `attach_library()` as a no-op (in Storybook, `sb-main.js` loads every behavior). Do not reinstall the npm package
- A component with a behavior attaches its Drupal library at the top of its template: `{{ attach_library('storybook_tw_base/<name>') }}` (literal string, single quotes: the assets build rewrites `'storybook_tw_base/` to the project's `library` option in `dist/components/`). A component that uses another library (the carousel with lightbox or scrollCue animations) attaches it too
- Do not use other Drupal-specific Twig filters/functions (`|clean_class`, `|without`…) in components: apply them in the Drupal theme and pass the result to the include (e.g. `with { type: type|clean_class }`), and reproduce them in the story helpers if needed
- Do not use `|t` in components: expose a variable with an English default (e.g. `breadcrumb_title|default('Breadcrumb')`) and let Drupal pass the translated string
- Do not upgrade Twig in isolation without checking loader and helper compatibility
- Include other components with `@components/…` (e.g. `{% include "@components/icon/icon.twig" %}`), never with relative paths: `@components/` resolves to the project file first, so overrides apply to nested includes too
- twig.js does not accept an empty string as a hash key (`{ '': … }`): use a named key such as `'default'`, and no `{# #}` comment inside a `{% set %}` tag
- Keep Twig story patterns consistent with existing files under `stories/components/` and `stories/foundations/`

### Tailwind classes in templates

- Tailwind only generates the classes it finds as complete strings. A class built from a variable (`'btn-' ~ type`, `text-display-{{ level }}`) must be listed with `@source inline('…')` in the component CSS (see `button.css`, `badge.css`, `link.css`, `paragraph.css`, `display-heading.css`), or chosen from a Twig map of complete strings (see `alert.twig`, `icon.twig`, `pagination.twig`)
- Classes toggled by JavaScript go in the template as variants of a data or ARIA attribute (`data-active:block`, `aria-expanded:bg-primary-subtle`, `data-dismissed:opacity-0`): the Drupal theme only scans `dist/components/`, not the behaviors
- Spacing follows Tailwind's scale: Bootstrap's `*-3`, `*-4`, `*-5` are `*-4`, `*-6`, `*-12` (`*-1`, `*-2` are unchanged)
- Rows of columns: `-mx-3 flex flex-wrap *:max-w-full *:shrink-0 *:px-3` on the row and `w-full md:w-1/2`… on the columns (the Bootstrap `.row` / `.col-*` equivalent). Do not use `grid grid-cols-12` with a gap: it overflows on small screens and breaks Masonry
- Keep the class names used as JavaScript or Drupal hooks (`glightbox`, `gallery-grid`, `form-required`, `js-form-*`, `pager__item--*`…)

### Dist collection caveat

In `config/assets.mjs`, Twig files copied to `dist/components` exclude `*.local.twig`.

That means:

- `*.twig` = distributable component templates
- `*.local.twig` = local/story examples only

Do not move a distributable template to `*.local.twig` unless that is intentional.

---

## Styles

- `stories/core.css`: imported by the projects' `core.css`. Tailwind's theme and utilities **without preflight** (`source(none)`: no automatic source detection), then `foundations/theme.css`, `foundations/typography/fonts.css`, `foundations/base.css`, `foundations/utilities.css`, `components/index.css` and `utilities/index.css`. Free when unused, tokens and base styles aside
- `stories/deps.css`: `components/deps.css` and `utilities/deps.css`, the `<name>.deps.css` of every component (vendor CSS, safelists), imported by the projects' `main.css`. A Drupal theme imports only those of the components it uses
- `stories/tailwind.css`: `core.css` + `deps.css`, the whole design system
- `stories/main.css`: the Storybook entry of this repository (`@import './tailwind.css';`)
- `foundations/theme.css`: design tokens (`@theme`), the former Bootstrap variables: colors with their `-subtle`, `-border-subtle`, `-emphasis` variants, `--contrast-*` (readable text color per background), `--btn-tint-*`, breakpoints `sm`…`xxl` (576…1400px), container widths, `text-h1`…`text-h6`, `text-display-1`…`6`, radii, shadows. Tailwind's own palette, radii, shadows and font sizes are reset (`--*: initial`)
- `foundations/base.css`: element defaults (`@layer base`), the equivalent of Bootstrap's reboot, so that Drupal and CKEditor markup looks the same
- `foundations/utilities.css` and the component CSS files: custom utilities (`@utility`): `container`, `text-bg-*`, `bg-gradient`, `focus-ring`, `btn-close`, `visually-hidden`, `btn` / `btn-*` / `btn-outline-*` / `btn-sm` / `btn-lg`, `badge`, `link-*`, `form-control` (+ `-sm`, `-lg`, `-color`, `-plaintext`), `form-select`, `form-check`, `form-check-input`, `form-switch`, `form-floating`, `form-range`. Sizes and variants change CSS variables (`--btn-*`, `--form-control-*`) rather than the same properties, so that the result does not depend on the order of the utilities
- Vendor CSS is imported by the component that needs it (`@import 'leaflet/dist/leaflet.css' layer(components);`); the assets build copies it to `dist/css/src/vendor/`
- Font URLs are relative to the compiled stylesheet (`css/`), next to which the fonts are copied (`css/fonts/`): asset URL rewriting is off

---

## Assets Build Notes

Assets are built by `config/assets.mjs` (`defineAssetsConfig()`, called by `vite.assets.config.mjs`; `npm run assets` / `assets:watch`). It runs through Vite but does not bundle: a small plugin compiles, concatenates and copies files. It is kept out of `vite.config.*` on purpose, so Storybook's Vite does not load it.

### The assets build is responsible for

- writing the CSS sources of every layer to `node_modules/.cache/storybook-tw-base/css/` and compiling them with Tailwind, scanning the `stories/` folder of each layer → `public/css/style.css`, `dist/css/style.css` and `style.min.css`
- writing the CSS sources to `dist/css/src/` (imports made relative, vendor CSS copied) and `dist/css/tailwind.css`, the Tailwind entry of the Drupal theme (it scans `../components`)
- concatenating vendor JS (Leaflet, scrollCue, GLightbox, Masonry) and `*.behaviors.js` → `sb-main.js` + `sb-main.min.js` in `public/js/` and `dist/js/`
- writing one file per behavior (`dist/js/components/<name>.js`) and per vendor (`dist/js/vendor/`), and the Drupal libraries (`dist/libraries.yml`: `vendor-<name>` libraries, then one library per behavior depending on `core/drupal`, `core/once` and its `@drupal-dependencies`)
- copying Twig templates for distribution (library namespace rewritten)
- copying images and fonts into `dist/`

### JS

Vendors are concatenated as is, not imported as ES modules: the behaviors and the Drupal theme rely on their globals (`L`, `GLightbox`, `Masonry`, `scrollCue`). Keep `sb-main.js` and the behavior files classic scripts. A behavior declares its library dependencies in its header comment:

```js
/**
 * @file Leaflet map with a marker (and its popup).
 *
 * @drupal-dependencies leaflet
 */
```

Names without a slash are the vendors of `config.vendors` (`vendor-<name>` libraries); other names (`core/drupal.debounce`) are used as is.

### Watch mode

`assets:watch` watches `stories/` and only re-runs the affected tasks: `*.css` → styles; `*.twig` (not `*.local.twig`) → Twig copy and styles; `*.behaviors.js` → JS and styles; other `*.twig`, `*.js` and `*.md` → styles (classes live in the templates and stories). Images and fonts are only copied on the first build.

### Caution

The assets build removes the sub-directories of `dist/` before regeneration. Avoid interrupting a build mid-process if you want to preserve a clean generated tree.

---

## Component Conventions

A component folder under `stories/components/<name>/` commonly contains:

```text
<name>.twig
<name>.css
<name>.stories.js
<name>.docs.md
<name>.behaviors.js
```

Only add the files that are needed. A `<name>.css` is registered in `stories/components/index.css` (one `@import './<name>/<name>.css';` line per component, so that the build can filter it). A `<name>.behaviors.js` gets a Drupal library of the same name, attached by the template.

### Drupal form components

Form components live in `stories/components/form/`, with one sub-folder per Drupal core template (`form-element`, `form-element-label`, `input`, `textarea`, `select`, `fieldset`, `radios`, `checkboxes`). Each keeps **exactly the variables of that core template**, so a Drupal override is a single `{% include "@components/form/<name>/<name>.twig" %}`. Exception: `form-element` expects `type` and `name` already cleaned (`with { type: type|clean_class, name: name|clean_class }`); `form.helpers.js` cleans them with `cleanClass()` in the stories.

- Derive classes from the classes Drupal core sets (`attributes.hasClass('form-text')`…), not from preprocess-only variables. The controls use the utilities of `form/form.css`; a control with the `error` class or `aria-invalid="true"` is shown as invalid
- Do not define a `form-text` utility: it is a Drupal core class of text inputs
- The form styles are all in `form/form.css` (imported by `components/index.css`), the rest is utilities in the templates
- Stories render fields through `stories/components/form/form.helpers.js`, which mimics Drupal's `FormPreprocess` (ids, label, description, error/required states)
- twig.js does not support a ternary without `else` inside an array literal: write `cond ? 'class' : ''`
- `collectTwig` rewrites `.twig'` to `.twig"`: use double quotes for template paths, even in comments

### Existing story pattern

Most stories follow this structure:

1. import the Twig template
2. optionally import raw source with `?raw` (shown via `parameters.componentSource`)
3. export Storybook metadata
4. define a `Template` function returning `template(args)`
5. export variants with `.bind({})`

Interactive components have `play` interaction tests (accordion, alert, carousel, modal, images gallery). Preserve this style unless the whole repo is intentionally refactored.

---

## Foundations and Utilities

- `stories/foundations/` contains design primitives (tokens, base styles, utilities) and theme-level examples
- `stories/utilities/` contains JS behavior helpers or utility-level assets (animations, icons, masonry, tooltips)
- `stories/components/` contains reusable UI components

When unsure where a new file belongs:

- use `components/` for reusable UI blocks
- use `foundations/` for theme primitives and references
- use `utilities/` for shared support code or behavior scripts

The utilities behaviors (`tooltips`, `masonry`, `animations`) work on any markup with their attributes (`data-tooltip`, `data-masonry`, `data-cue`): the Drupal theme attaches their libraries where it needs them.

---

## Manager Theme

Storybook manager UI customization lives in:

- `.storybook/manager.js`
- `.storybook/MyTheme.js`

Do not change branding or manager theme settings unless the task is specifically about Storybook UI branding.

---

## Agent Guardrails

### Do

- modify source files, not generated outputs
- follow the existing Storybook/Twig/Tailwind/Vite assets architecture
- keep changes small and consistent with nearby files
- verify build impact when touching `config/`, `.storybook/`, or dependency versions
- check repository status before and after running build steps
- compare the rendering with storybook-base when changing shared styles: the design must stay the same

### Do not

- do not manually edit `public/`, `dist/`, or `storybook-static/`
- do not replace the Vite assets build, Tailwind, Twig, or Storybook framework choices unless explicitly requested
- do not reintroduce Sass, Bootstrap CSS or Bootstrap JS (Bootstrap Icons, the icon font, is fine)
- do not import `tailwindcss` with its preflight, nor enable automatic source detection
- do not assume `dist/` is disposable without checking git state
- do not upgrade Twig alone without validating the rest of the Twig toolchain
- do not introduce unrelated frameworks or tooling (React, TypeScript, Alpine, etc.) unless requested

---

## Validation Checklist

After a meaningful change, validate the relevant flow:

```bash
ddev npm run assets
ddev npm run storybook
ddev npm run build-storybook
ddev npm test
ddev npm run lint
```

Also verify:

- Storybook starts without loader errors
- Twig stories render correctly
- global CSS is present, and the classes of a new template exist in `public/css/style.css`
- `public/js/sb-main.js` exists if Storybook imports it
- `dist/libraries.yml` lists the new behaviors, with unique library names
- no unintended generated-file churn appears in git status

---

## Quick Decision Guide

### If you need to...

- **change a component’s markup** → edit its `.twig`
- **change component styling** → edit the Tailwind classes of its `.twig`, or its `.css` (custom utilities, safelist)
- **change a color, size or font for everything** → edit `stories/foundations/theme.css`
- **change component behavior** → edit `*.behaviors.js` (use `Drupal.behaviors` + `once()`, never `DOMContentLoaded`)
- **change Storybook presentation/docs** → edit `*.stories.js`, docs files, or `.storybook/`
- **change build behavior** → edit `config/assets.mjs` or `config/storybook.js`
- **change distributed Twig output** → verify both source Twig and the `collectTwig` rewrites in `config/assets.mjs`

---

## Used as a package

### What projects get

A project installs storybook-tw-base and keeps only its own files. The step-by-step setup of a new project (sub-theme) is in `README.md` → *Start a new project*: keep it in sync when changing what a project needs (config files, `package.json` options, CSS entry point). Its config files are one-liners:

```js
// .storybook/main.js
import { defineStorybookConfig } from 'storybook-tw-base/storybook';
export default defineStorybookConfig({ hosts: ['my-project.ddev.site'] });

// .storybook/preview.js: spread the shared preview, and write storySort and
// tags here as literals (Storybook reads them statically and does not follow
// imports: without tags, no Docs pages)
import preview from 'storybook-tw-base/preview';
export default {
  ...preview,
  parameters: {
    ...preview.parameters,
    options: { storySort: { method: 'alphabetical', order: ['Documentation', 'Foundations', 'Utilities', 'Components', '*'] } },
  },
  tags: ['autodocs'],
};

// vite.assets.config.mjs
import { defineAssetsConfig } from 'storybook-tw-base/assets';
export default defineAssetsConfig();

// .storybook/manager.js: origin icons in the sidebar
import { addons } from 'storybook/manager-api';
import { sidebar } from 'storybook-tw-base/manager';
addons.setConfig({ theme: MyTheme, sidebar });
```

and its `package.json` has `"overrides": { "drupal-twig-extensions": "$storybook-tw-base" }` (the package exports `./twig`, so the vulnerable npm package is never installed) and `"storybook-tw-base": { "exclude": [], "library": "my_theme" }`.

### Layers

Files are resolved through two layers (`config/layers.js`): the project `stories/`, then `node_modules/storybook-tw-base/stories/`. A project file at the **same path** wins:

- **Twig**: `@components/…` includes and story imports
- **Stories**: a storybook-tw-base story is hidden when the project has a story at the same path
- **Behaviors**: a project `*.behaviors.js` replaces the storybook-tw-base one at the same path (also in `dist/js/components/` and `dist/libraries.yml`)
- **dist/components, images, fonts**: storybook-tw-base files first, then the project ones on top
- **CSS**: the project `stories/core.css` imports `storybook-tw-base/stories/core.css`, then its `@theme` token overrides, then its own `stories/components/index.css`; its `stories/main.css` imports `./core.css`, `storybook-tw-base/stories/deps.css` and its own `stories/components/deps.css`. Import storybook-tw-base files with the `storybook-tw-base/stories/…` path: the build rewrites it. A project `stories/components/<name>/<name>.css` **replaces** the storybook-tw-base one (its line is dropped from the base index); the project file can `@import 'storybook-tw-base/stories/components/<name>/<name>.css';` to extend it instead. The build scans the `stories/` folder of both layers: no `@source` in the project entry
- **Drupal**: `dist/css/src/` holds the project CSS at its root and the storybook-tw-base CSS in `dist/css/src/storybook-tw-base/`; the theme compiles `dist/css/tailwind.css` (everything), or the project `dist/css/src/core.css` plus the deps of the components it uses (drusttw4)

### Origin of the stories

In a project, `storybookIndexers()` (`config/storybook.js`) tags each storybook-tw-base story `storybook-tw-base`, or `storybook-tw-base-overridden` when the project has overriding files (`*.twig` except `*.local.twig`, `*.css`, `*.behaviors.js`) in the same folder. `config/manager.js` (`storybook-tw-base/manager`) renders them as sidebar icons. No tag in storybook-tw-base's own Storybook (single layer). Keep the tag names in sync between both files: they are public API (projects may filter on them)

### Excluding components

A project lists the storybook-tw-base components it does not use in its `package.json`: `"storybook-tw-base": { "exclude": ["modal", "card"] }` (names under `stories/components/`, or paths relative to `stories/`). `config/layers.js` reads it; excluded base files are left out of the stories, `dist/components/` (so the theme's Tailwind does not see their classes), the components and utilities CSS indexes, the CSS sources, `sb-main.js` and the Drupal libraries. They still resolve for `@components/…` imports, and the assets build warns when a kept template includes one. Keep `stories/components/index.css` and `stories/utilities/index.css` to one `@import './<name>/<name>.css';` line per component, so the filter keeps working.

### Library namespace

`"storybook-tw-base": { "library": "my_theme" }` sets the Drupal theme machine name (default `storybook_tw_base`): the assets build replaces `'storybook_tw_base/` with `'my_theme/` in `dist/components/` and uses it in `dist/libraries.yml`, which the theme copies into `my_theme.libraries.yml`.

### Consequences for changes here

- Everything under `stories/`, `config/`, `packages/` is public API for projects: renaming a template, a Twig variable, a design token, a custom utility, a library or a behavior file breaks overrides. Treat such changes as breaking (major version)
- Prefer tokens (`theme.css`) and CSS variables over hard-coded values in component styles, so projects can tune them without overriding the file
- Keep `files` and `exports` in `package.json` in sync when adding files that projects need

### Releasing

```bash
# after committing the changes
ddev npm version minor   # or patch / major: bumps package.json, commits, tags vX.Y.Z
git push --follow-tags   # run by the user (no remote git operations by agents)
```

Projects then install the new tag and align the `drupal-twig-extensions` override, which is a second copy of storybook-tw-base (see README → *Updating storybook-tw-base in a project*):

```bash
ddev npm install storybook-tw-base@github:Greg735/storybook-tw-base#vX.Y.Z
ddev npm update drupal-twig-extensions
```

When `packages/drupal-twig-extensions/twig.js` changes, say so in the release: projects that skip the second command keep the previous Twig extensions.

---

## Final Rule

When in doubt, follow the existing implementation patterns already present in the repository rather than inventing a new structure.
