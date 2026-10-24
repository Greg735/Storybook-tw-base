<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>


## Intro

Provide a simple accordion. By default, opening an item closes the others; set `independent: true` to open them independently.

## Purpose


## JavaScript

Opening and closing the items (with a height transition) is handled by the vanilla `accordion.behaviors.js` (`Drupal.behaviors` + `once()`, no Bootstrap). The template attaches its Drupal library with `{{ attach_library('storybook_tw_base/accordion') }}`; in `dist/components/`, the namespace is replaced by the theme's (see `dist/libraries.yml`).

## Implementation example
```
  {% include '@components/accordion/accordion.twig' with {
    accordion_id: 'faq',
    items: [
      { title: 'First item', content: '<p>First content</p>', open: true },
      { title: 'Second item', content: '<p>Second content</p>' },
    ],
  }%}
```