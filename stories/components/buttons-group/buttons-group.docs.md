## Purpose



## Implementation example
```
  {% include '@components/buttons-group/buttons-group.twig' with {
    content: buttons,
    buttons_attributes: { role: 'group', 'aria-label': 'Actions' },
  }%}
```