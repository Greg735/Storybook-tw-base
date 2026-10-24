/**
 * @file Minimal stand-in for the drupal-twig-extensions package.
 *
 * vite-plugin-twig-drupal always imports `drupal-twig-extensions/twig` and
 * calls addDrupalExtensions(), but the npm package pulls in a vulnerable
 * locutus@2. The components do not use Drupal-specific Twig filters (such as
 * |clean_class, applied by the Drupal theme before the include), so only
 * attach_library() is registered.
 */

/**
 * Same signature as drupal-twig-extensions/twig.
 *
 * attach_library() renders nothing: in Storybook, every behavior is loaded by
 * sb-main.js.
 */
export function addDrupalExtensions(Twig) {
  Twig.extendFunction('attach_library', () => '');
}
