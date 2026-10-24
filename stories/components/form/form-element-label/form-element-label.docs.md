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

Label of a form element, with the required marker.

## Files

`stories/components/form/form-element-label/`

- `form-element-label.twig`
- `form-element-label.stories.js`
- `form-element-label.docs.md`

## Drupal integration

Same variables as Drupal core `form-element-label.html.twig`: the override is a
one-line include.

```
{# templates/form/form-element-label.html.twig #}
{% include '@components/form/form-element-label/form-element-label.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `title` | Label text (`#title`). |
| `title_display` | `before`, `after` (checkbox, radio) or `invisible`. |
| `required` | Whether the element is required. |
| `attributes` | Label attributes (includes `for`). |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| `title_display` before | `mb-2` |
| `title_display` after | `option` (no extra style) |
| `title_display` invisible | `sr-only` |
| `required` | `form-required` + `after:ms-1 after:text-danger after:content-['*']` → red `*` marker |

## Form API example

```php
$form['name'] = [
  '#type' => 'textfield',
  '#title' => $this->t('Name'),
  '#title_display' => 'invisible',
  '#required' => TRUE,
];
```

See **Components / Form / Form** for the whole form integration.
