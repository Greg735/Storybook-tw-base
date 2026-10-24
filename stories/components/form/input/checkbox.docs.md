<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-green">Drupal: 11</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>

## Intro

Single checkbox, rendered by `input.twig` inside a `form-check` Form element. Add `form-switch` to `#wrapper_attributes` to get a switch.

## Files

`stories/components/form/input/`

- `input.twig`
- `checkbox.stories.js`
- `checkbox.docs.md`

## Drupal integration

Same variables as Drupal core `input.html.twig`: the override is a
one-line include.

```
{# templates/form/input.html.twig #}
{% include '@components/form/input/input.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Input attributes (`form-checkbox` class set by Drupal core). |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| `form-checkbox` | `form-check-input` |
| Form element of type checkbox | `form-check` |
| `#wrapper_attributes` class `form-switch` | `form-switch` |
| `error` (or `aria-invalid`) | invalid style (red border) |

## Form API example

```php
$form['newsletter'] = [
  '#type' => 'checkbox',
  '#title' => $this->t('Subscribe to the newsletter'),
  '#wrapper_attributes' => ['class' => ['form-switch']],
];
```

See **Components / Form / Form** for the whole form integration.
