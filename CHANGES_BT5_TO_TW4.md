# storybook-base (Bootstrap 5) → storybook-tw-base (Tailwind CSS 4)

`storybook-tw-base` est une copie de `storybook-base` où Bootstrap 5 + Sass sont remplacés par Tailwind CSS 4. Le reste est identique : Storybook 10, Twig, layers et overrides, build Vite, tests, DDEV, design.

## Résultat

- Comparaison visuelle automatisée (Playwright, chaque story en 375 px et 1280 px) : **321 captures sur 342 identiques** (écart < 0,1 %).
- Les 21 écarts restants sont voulus ou viennent du timing des captures :
  - libellés renommés : `bs-blue` → `color-blue`, `h1` → `text-h1` ;
  - texte de la page d'intro (mentionne Tailwind) ;
  - bouton « Open the modal » ajouté à la story de la modale (avant, elle n'affichait rien) ;
  - lightbox de la galerie capturée pendant son ouverture (fonction `play`) ;
  - contenu de l'iframe YouTube.
- `ddev npm run lint` OK, `ddev npm test` : 171 tests OK.

## Stack

| Avant | Après |
| --- | --- |
| Bootstrap 5.3 (Sass + `bootstrap.bundle.js`) | Tailwind CSS 4 (`tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/node`) |
| `sass`, `autoprefixer`, `cssnano` | `optimize()` de `@tailwindcss/node` (Lightning CSS) |
| `stories/main.scss` | `stories/main.css` → `stories/tailwind.css` |
| `_<composant>.scss` | `<composant>.css` (seulement si nécessaire) |
| Bootstrap JS (collapse, carousel, modal, tooltip, alert) | behaviors Drupal vanilla |
| `bs5-lightbox` (inutilisé) | supprimé |

Conservés : `bootstrap-icons` (police d'icônes), `leaflet`, `glightbox`, `masonry-layout`, `scrollcue`.

## Fondations (`stories/foundations/`)

- **`theme.css`** (`@theme`) : tokens repris des valeurs Bootstrap compilées de storybook-base.
  - Couleurs : `primary`… `dark`, `blue`… `teal`, `gray-100`… `gray-900`, `*-subtle`, `*-border-subtle`, `*-emphasis`, `body`, `muted`, `border`, `link`, etc. La palette Tailwind par défaut est supprimée.
  - `--contrast-*` : couleur de texte lisible pour chaque couleur (équivalent de `color-contrast()`).
  - `--btn-tint-*` : couleurs dont le survol des boutons est éclairci au lieu d'être assombri.
  - Breakpoints Bootstrap : `sm` 576, `md` 768, `lg` 992, `xl` 1200, `xxl` 1400 (le `2xl` de Tailwind est supprimé).
  - Largeurs max du container : 540 / 720 / 960 / 1140 / 1320.
  - Polices : OpenSans.
  - Tailles `text-h1`… `text-h6` et `text-display-1`… `6`, avec le comportement responsive (RFS) reproduit via `min()`.
  - Rayons : `rounded` = 0,375rem, `rounded-sm/md/lg/xl/2xl` = Bootstrap 1 à 5.
  - Ombres : `shadow-sm`, `shadow`, `shadow-lg` = celles de Bootstrap.
- **`base.css`** : équivalent du reboot Bootstrap. Le *preflight* de Tailwind n'est pas importé, pour que le HTML brut (Drupal, WYSIWYG) garde le même rendu.
- **`typography/fonts.css`** : `@font-face` OpenSans (woff2/woff).
- **`utilities.css`** : `container`, `text-bg-*`, `bg-gradient`, `btn-close`, `visually-hidden` (classe de Drupal core), `focus-ring`.

Les anciens fichiers Sass (`_variables.scss`, `_configuration.scss`, `_styles.scss`, `_utilities.scss`, `_index.scss`) sont supprimés.

## Classes : correspondances Bootstrap → Tailwind

| Bootstrap | Tailwind |
| --- | --- |
| espacements `1 / 2 / 3 / 4 / 5` (`m*`, `p*`, `g-*`) | `1 / 2 / 4 / 6 / 12` |
| espacements custom `6 / 7 / 8 / 9 / 10` | `16 / 20 / 24 / 28 / 32` |
| `d-flex`, `d-none`, `d-md-block` | `flex`, `hidden`, `md:block` |
| `w-100`, `h-100` | `w-full`, `h-full` |
| `align-items-center`, `justify-content-center`, `align-self-center` | `items-center`, `justify-center`, `self-center` |
| `text-uppercase`, `fw-bold`, `fw-lighter` | `uppercase`, `font-bold`, `[font-weight:lighter]` |
| `h1`… `h6` (classes), `fs-*` | `text-h1`… `text-h6` |
| `display-1`… `6` | `text-display-1`… `6` |
| `lead` | `text-lg font-light` |
| `rounded-pill`, `rounded-4` | `rounded-full`, `rounded-xl` |
| `visually-hidden` | `sr-only` (`visually-hidden` reste défini pour Drupal) |
| `list-unstyled` | `list-none ps-0` |
| `img-fluid` | `h-auto max-w-full` |
| `ratio ratio-16x9` | `relative aspect-video` + enfant `absolute inset-0 size-full` |
| `text-body-secondary` | `text-muted` |
| `border-3` sur un `<hr>` | `border-t-3` |
| `row` + `col-md-6` | `-mx-3 flex flex-wrap *:max-w-full *:shrink-0 *:px-3` + `w-full md:w-1/2` |

**Grilles** : pas de `grid-cols-12` avec `gap`. Douze colonnes plus onze gouttières débordent en mobile, et Masonry a besoin de largeurs en pourcentage. Les rangées sont donc des flex rows, équivalentes aux `.row` de Bootstrap.

**Classes dynamiques** (`'btn-' ~ type`, `text-bg-{{ color }}`…) : listées explicitement avec `@source inline()` dans le CSS du composant, sinon Tailwind ne les génère pas.

## Utilitaires « composants » (`@utility`)

Ce sont de vrais utilitaires Tailwind : ils fonctionnent avec les variantes (`hover:`, `md:`) et ne sont générés que s'ils sont utilisés. Ils évitent de répéter des dizaines de classes dans les templates, le contenu et les thèmes.

| Utilitaire | Fichier |
| --- | --- |
| `btn`, `btn-<couleur>`, `btn-outline-<couleur>`, `btn-sm`, `btn-lg` (couleurs de survol, focus et actif calculées comme Bootstrap) | `components/button/button.css` |
| `badge` | `components/badge/badge.css` |
| `link-<couleur>` | `components/link/link.css` |
| `form-control`, `form-control-sm/lg`, `form-control-plaintext`, `form-control-color`, `form-select`, `form-check`, `form-check-input`, `form-switch`, `form-floating`, `form-range` | `components/form/form.css` |

L'état invalide des champs se déclenche avec la classe Drupal `error`, `aria-invalid="true"` ou `is-invalid`. `is-valid` est aussi supporté.

## Composants : changements notables

| Composant | Changement |
| --- | --- |
| accordion | Behavior vanilla, transition de hauteur, `aria-expanded`. Attributs `data-accordion`, `data-accordion-exclusive` (si non `independent`), `data-accordion-trigger`. |
| alert | Fermeture avec `data-dismiss="alert"` (au lieu de `data-bs-dismiss`), fondu puis suppression. |
| carousel | Behavior vanilla : précédent/suivant, indicateurs, flèches clavier, swipe, autoplay de 5 s en pause au survol. Contrôles en `<button>`. Attache aussi `image-lightbox` et `animations` quand il les utilise. |
| modal | `<dialog>` natif : ouverture avec `data-modal-target="#id"`, fermeture avec `data-modal-close`, Échap ou clic sur le fond. Tailles `modal-sm/lg/xl` conservées comme valeurs de `modal_size`. |
| tooltips | Behavior vanilla : `data-tooltip="…"`. Les anciens `data-bs-toggle="tooltip"` + `data-bs-title` restent supportés. |
| images-gallery | `gallery_grid` par défaut : `w-1/2 sm:w-1/3 md:w-1/4` (au lieu de `col-6 col-sm-4 col-md-3`). `gallery_spacing` (0 à 5) est inchangé. |
| icon-featured | La classe `icon-featured-hover` est supprimée ; utiliser `transition-transform duration-300 hover:scale-110`. |
| map | CSS Leaflet importée. Le chemin des images du marqueur est corrigé (`../img/leaflet/`). |
| form | Mêmes variables que les templates Drupal core. |

**Défaut reproduit exprès (form)** : dans l'original, les inputs `form-text` (classe Drupal) recevaient une marge haute de 4 px, à cause d'une collision avec la classe Bootstrap `.form-text`. Elle est reproduite (`mt-1`) pour garder le même rendu.

Les noms des behaviors (`Drupal.behaviors.jb*`) et les identifiants `once('jb-*')` sont conservés.

## Intégration Drupal

### CSS : compilée par le thème

```css
/* CSS du thème */
@import "../dist/css/tailwind.css";
@source "../templates";
```

- `dist/css/tailwind.css` est une entrée générée qui scanne `dist/components`.
- `dist/css/src/` contient les sources CSS (base, projet, et CSS des librairies tierces copiée). Seul `tailwindcss` doit être installé.
- Les URLs des polices sont relatives à `dist/css/` : écrire la CSS compilée à cet endroit, ou copier `dist/css/fonts/` à côté d'elle.
- `dist/css/style.css` et `style.min.css` précompilées sont toujours produites, si besoin.

### JS : une library par composant

- Les templates appellent `{{ attach_library('storybook_tw_base/<nom>') }}`.
- Dans `dist/components/`, le préfixe est remplacé par le nom du thème, défini dans le `package.json` du projet :
  ```json
  "storybook-tw-base": { "library": "mon_theme" }
  ```
- `dist/js/components/<nom>.js` : un fichier par behavior.
- `dist/js/vendor/*.js` : Leaflet, GLightbox, Masonry, scrollCue (libraries `vendor-<nom>`).
- `dist/libraries.yml` (généré) est à recopier dans `mon_theme.libraries.yml`. Les dépendances `core/drupal`, `core/once` et vendor sont déclarées.
- Dans un behavior, l'en-tête `@drupal-dependencies leaflet` déclare ses dépendances vendor.
- Les utilitaires `tooltips`, `masonry` et `animations` sont à attacher par le thème là où ils sont nécessaires.
- Storybook : `attach_library` ne fait rien (enregistré dans `packages/drupal-twig-extensions/twig.js`), et `sb-main.js` charge tout.

## Utilisation comme package (projets)

- Dépendance : `"storybook-tw-base": "github:Greg735/storybook-tw-base#vX.Y.Z"`.
- Overrides : `"drupal-twig-extensions": "$storybook-tw-base"`.
- Options :
  ```json
  "storybook-tw-base": { "exclude": ["modal"], "library": "mon_theme" }
  ```
  L'option `excludeBootstrap` est supprimée.
- `stories/main.css` du projet :
  ```css
  @import 'storybook-tw-base/stories/tailwind.css';
  @theme { --color-primary: …; --contrast-primary: …; }
  @import './components/<nom>/<nom>.css';
  ```
- Un fichier `stories/components/<nom>/<nom>.css` du projet remplace celui de la base. Il est alors retiré de l'index de la base.
- Les tags de la sidebar deviennent `storybook-tw-base` et `storybook-tw-base-overridden`. Les fichiers qui « surchargent » une story sont maintenant `*.css` (au lieu de `_*.scss`).
- `package.json` exporte `./stories/*`.

## Build (`config/assets.mjs`)

- Styles : Tailwind via PostCSS, sans réécriture des URLs d'assets.
  - Sources scannées : les `stories/` de chaque layer (détection automatique désactivée).
  - Sorties : `public/css/style.css`, `dist/css/style.css`, `style.min.css`, `dist/css/tailwind.css` et `dist/css/src/`.
- JS :
  - `sb-main.js` et `sb-main.min.js` (vendors + behaviors) ;
  - un fichier par behavior et par vendor ;
  - `dist/libraries.yml`.
- Watch :

  | Fichier modifié | Tâches relancées |
  | --- | --- |
  | `*.css` | styles |
  | `*.twig` | twig + styles |
  | `*.behaviors.js` | js + styles |
  | autres `.twig`, `.js`, `.md` | styles |

## Divers

- DDEV : projet `storybook-tw-base`, Storybook sur `https://storybook-tw-base.ddev.site:6008` (http : 6007).
- ESLint : la globale `bootstrap` est retirée.
- Dependabot : groupe `tailwind` ajouté.
- Documentation mise à jour : `README.md`, `AGENTS.md` et toutes les `*.docs.md`.
- Tests d'interaction ajoutés : accordion, alert, modal et carousel.

## Ajouts ultérieurs

- **CSS en deux parties** : `stories/core.css` (gratuit si inutilisé : tokens, base, utilitaires des composants) et `<composant>.deps.css` (CSS tierce et classes forcées, chargées seulement si le composant est utilisé). `stories/tailwind.css` = `core.css` + `stories/deps.css` (toutes les deps).
- **Sous-projets** : même découpage. `stories/core.css` du projet (import de `storybook-tw-base/stories/core.css`, `@theme`, `components/index.css`) et `stories/main.css` (`./core.css`, `storybook-tw-base/stories/deps.css`, `components/deps.css`). Tout import `storybook-tw-base/stories/…` est réécrit en chemin relatif dans `dist/css/src/` (avant : seul `tailwind.css` l'était, un `@import` d'extension d'un composant de base cassait côté Drupal).
- **Safelists ajoutées** : `icon-featured.deps.css` (`text-bg-*`) et `text-bg-*` dans `paragraph.deps.css`.
- **Package** : `dist/` est publié (`files`), pour qu'un thème puisse le recopier.
- **Thème Drupal 11 `drusttw4`** (`/var/www/drusttw4`) :
  - recopie le `dist/` (`npm run sync`) et génère `drusttw4.libraries.yml` ;
  - compile sa CSS uniquement à partir des composants que ses templates incluent (`npm run css`) ;
  - fournit des hooks qui ajoutent des classes Tailwind au markup Drupal sans template de composant ;
  - contient les templates qui incluent les composants : formulaires, navigation, paragraphes, vues…
  - Voir son `README.md`.
- **`#main-content *:not(h1):last-child`** (marge basse à 0 en `!important`, qui l'emporte sur les utilitaires) : désactivable avec `data-keep-last-margin` sur `#main-content` (utilisé par le projet Unisante Test, dont le site d'origine garde ces marges).
- **Panneau des addons masqué sur l'Introduction** : tag `no-panel` sur la story, lu par un petit addon de `config/manager.js` (importé par `.storybook/manager.js` et par les projets via `storybook-tw-base/manager`). Le paramètre `options.showPanel` d'une story ne s'applique qu'au premier chargement de la page, d'où ce choix.
