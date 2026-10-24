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

Groups related elements under a framed fieldset with a legend. Drupal also uses it to wrap **Radios** and **Checkboxes** (`fieldgroup form-composite` classes): their legend is then styled like a label.

## Files

`stories/components/form/fieldset/`

- `fieldset.twig`
- `fieldset.stories.js`
- `fieldset.docs.md`

## Drupal integration

Same variables as Drupal core `fieldset.html.twig`: the override is a
one-line include.

```
{# templates/form/fieldset.html.twig #}
{% include '@components/form/fieldset/fieldset.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Fieldset attributes. |
| `legend` | Object with `title` and `attributes`. |
| `legend_span` | Object with `attributes`. |
| `required` | Whether the group is required. |
| `description` | Object with `content` and `attributes`. |
| `errors` | Error message (suppressed by Drupal core by default). |
| `prefix / suffix` | Content before / after the children. |
| `children` | Rendered child elements. |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| fieldset | `mb-4 rounded-md border border-border p-4`, legend `w-auto px-2 text-lg font-bold` |
| `form-composite` (radios, checkboxes) | no frame, label-like legend (`mb-2 text-base font-normal`) |
| `required` | `form-required` + `after:content-['*']` red marker on the legend |
| `description` | `mt-1 text-[0.875em] text-muted` |

## Form API example

```php
$form['address'] = [
  '#type' => 'fieldset',
  '#title' => $this->t('Address'),
];
$form['address']['street'] = ['#type' => 'textfield', '#title' => $this->t('Street')];
```

See **Components / Form / Form** for the whole form integration.
