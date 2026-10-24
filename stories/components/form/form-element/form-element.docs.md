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

Wrapper of every form element: label, prefix / suffix, the element itself, error message and description.

## Files

`stories/components/form/form-element/`

- `form-element.twig`
- `form-element.stories.js`
- `form-element.docs.md`

## Drupal integration

Same variables as Drupal core `form-element.html.twig`. The core template
cleans `type` and `name` with `|clean_class` before building its classes: the
component expects them **already cleaned**, so the override passes them with
`with`.

```
{# templates/form/form-element.html.twig #}
{% include '@components/form/form-element/form-element.twig' with {
  type: type|clean_class,
  name: name|clean_class,
} %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Wrapper attributes (`#wrapper_attributes`). |
| `type` | Element `#type` (textfield, checkbox, radio, select…), cleaned with `\|clean_class`. |
| `name` | Element `#name`, cleaned with `\|clean_class`. |
| `label` | Rendered label (see Form element label). |
| `label_display` | `before`, `after`, `invisible` or `attribute`. |
| `title_display` | Title display setting. |
| `prefix / suffix` | `#field_prefix` / `#field_suffix`. |
| `description` | Object with `content` and `attributes`. |
| `description_display` | `before`, `after` or `invisible`. |
| `errors` | Error message (Inline Form Errors module). |
| `disabled` | `disabled` when the element is disabled. |
| `children` | Rendered element. |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| `.form-item` wrapper | `mb-4` |
| `type` checkbox / radio | `form-check` (prefix / suffix in `text-muted`) |
| `#wrapper_attributes` class `form-switch` | `form-switch` |
| `prefix` / `suffix` | input group (`flex` wrapper, joined borders) + bordered `bg-tertiary-bg` addons |
| `errors` | `mt-1 block text-[0.875em] text-danger` |
| `description` | `mt-1 text-[0.875em] text-muted` |

## Form API example

```php
$form['price'] = [
  '#type' => 'number',
  '#title' => $this->t('Price'),
  '#field_prefix' => 'CHF',
  '#description' => $this->t('Price including VAT.'),
  '#description_display' => 'before',
];
```

See **Components / Form / Form** for the whole form integration.
