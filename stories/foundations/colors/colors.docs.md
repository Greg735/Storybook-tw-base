If you are building additional components and need access to global style variables, you may access them via CSS custom properties.

## Using Color Variables

CSS custom properties are utilized by wrapping the property in a `var()` function and prepending a `--` like so:

```
.sample-class {
  color: var(--bs-primary);
}
```

### Brand Primary Colors