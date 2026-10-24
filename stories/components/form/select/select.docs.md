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

Drop-down list, with optional option groups and multiple selection.

## Files

`stories/components/form/select/`

- `select.twig`
- `select.stories.js`
- `select.docs.md`

## Drupal integration

Same variables as Drupal core `select.html.twig`: the override is a
one-line include.

```
{# templates/form/select.html.twig #}
{% include '@components/form/select/select.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Select attributes. |
| `options` | List of options: `type` (option / optgroup), `value`, `label`, `selected`, and `options` for optgroups. |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| `form-select` | `form-select` (Drupal's class, styled as is) |
| `error` (or `aria-invalid`) | invalid style (red border and icon) |

## Form API example

```php
$form['canton'] = [
  '#type' => 'select',
  '#title' => $this->t('Canton'),
  '#options' => ['vd' => 'Vaud', 'ge' => 'Genève'],
  '#empty_option' => $this->t('- Select -'),
];
```

See **Components / Form / Form** for the whole form integration.
