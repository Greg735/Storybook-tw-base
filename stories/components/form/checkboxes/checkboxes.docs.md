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

Group of checkboxes. Drupal renders each option as an Input inside a Form element, groups them with this template and wraps the group in a composite **Fieldset**.

## Files

`stories/components/form/checkboxes/`

- `checkboxes.twig`
- `checkboxes.stories.js`
- `checkboxes.docs.md`

## Drupal integration

Same variables as Drupal core `checkboxes.html.twig`: the override is a
one-line include.

```
{# templates/form/checkboxes.html.twig #}
{% include '@components/form/checkboxes/checkboxes.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Group attributes (`id` and `title` only, set by Drupal core). |
| `children` | Rendered checkboxes. |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| group | `.form-checkboxes` |
| group | `*:mb-1` between options |
| each option | `form-check` + `form-check-input` (`form-checkbox`) |
| `#attributes` class `container-inline` | inline options (`in-[.container-inline]:*:inline-block`) |
| `#title` | fieldset legend styled like a label |

> In Drupal, `#attributes` land on the wrapping fieldset, not on this template: style inline options from `.container-inline`.

## Form API example

```php
$form['topics'] = [
  '#type' => 'checkboxes',
  '#title' => $this->t('Topics'),
  '#options' => ['health' => $this->t('Health'), 'research' => $this->t('Research')],
];
```

See **Components / Form / Form** for the whole form integration.
