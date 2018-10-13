# `Mask` component

Back to [Masking React](../README.md).

The `Maskin` component is a component that handles the masking process and
delegates to its children the responsibility of rendering the results.

```javascript
import { Mask } from "@maskin/react";

//...

<Mask pattern="###.###.###-##">
  {({ value, handleChange }) => (
    <input type="text" value={value} onChange={handleChange}
  )}
</Mask>
```

> This component uses the [_children render
pattern_](https://reactjs.org/docs/render-props.html#using-props-other-than-render).
This pattern allows you to pass a function as the component child, and this
function should return a component which can handle the data passed by that
function arguments.

## Mask props

### `pattern`

#### Definition: `pattern: string`

#### Usage:

The `pattern` prop is used to define the masking pattern to be used. It`s
defined by a string with special symbols (classes) and characters.

For example, you can define the following pattern: `"###-xx.XX"`. This pattern
defines that your masking expects three numbers (`#`), followed by a dash (`-`),
followed by two lowercase letters (`x`), followed by a dot (`.`), followed by
two uppercase letters (`XX`).

> To know more about characters classes like `#` and `x`, take a look at the
[core library
documentation](https://github.com/imbrn/maskin/tree/master/packages/core).

### `children`

#### Definition: `children: function`

#### Usage:

The `children` prop is a `function` that renders a React component. It gets an
object as argument. The argument object contains the following properties:

- `value`: this is the output masked value.

  Definition: `value: string`

  _It contains the final masked output with all characters._

- `rawValue`: this is similar to the `value` but it outputs only the class characters

  Definition: `rawValue: string`

  _It contains the final masked output but only with the characters captured by
  classes._

  _For example, if your pattern is `##-xx`, and your input is `12-ab`, so the
  `rawValue` is `12ab`, without the dash (`-`) as it's not a class character._

> The `children` of the `Masking` component uses the [_children render
pattern_](https://reactjs.org/docs/render-props.html#using-props-other-than-render).
This pattern expects a function as the component child, and this function is
responsible for creating the component that will be rendered.
