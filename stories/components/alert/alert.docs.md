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

Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.


## Purpose

Alert messages are shown to users after an action.

## JavaScript

The close button of a dismissible alert (fade out, then removal) is handled by the vanilla `alert.behaviors.js` (`Drupal.behaviors` + `once()`, no Bootstrap). The template attaches its Drupal library with `{{ attach_library('storybook_tw_base/alert') }}`; in `dist/components/`, the namespace is replaced by the theme's (see `dist/libraries.yml`).

## Implementation example
```
  {% include '@components/alert/alert.twig' with {
    type: 'success',
    text: 'This is an important text for the user to read.',
    dismissible: true,
  }%}
```