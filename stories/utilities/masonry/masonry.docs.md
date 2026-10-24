<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

# IMPORTANT NOTE:
Masonry (`masonry.pkgd.js`) is bundled in `sb-main.js` and initialised by the `Drupal.behaviors.jbMasonry` behavior on every element with a `data-masonry` attribute (valid JSON options, e.g. `{"percentPosition": true}`). The attribute is removed once the grid is initialised.


# Powered by masonry-layout

Masonry is a JavaScript grid layout library. It works by placing elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall. You’ve probably seen it in use all over the Internet.

[masonry](https://masonry.desandro.com/)

## Usage

The library is included in `sb-main.js`; in Drupal the library must depend on `core/drupal` and `core/once`.


## Integration

Just add the attribute 'data-masonry' with parameters and it'll work.

## Example

