# Maskin react

[Maskin](https://github.com/imbrn/maskin) module for working with React
applications. It provides useful stuff like masking components for you to use
within your React projects.

## Installing

```sh
npm i -S @maskin/react

#or

yarn add @maskin/react
```

## [The `Mask` component](./docs/Mask.md)

The `Mask` component is a higher-order component that uses the [_children render
pattern_](https://reactjs.org/docs/render-props.html#using-props-other-than-render)
to keep logic into the component but it delegates the responsibility of
rendering to the children.

_Example:_

```javascript
import { Mask } from "@maskin/react";
```

```jsx
<Mask pattern="###-xxx">
  {({ value, handleChange }) => (
    <input type="text" value={value} onChange={handleChange} />
  )}
</Mask>
```

See the [full documentation fo the Mask component](./docs/Mask.md).

## The `Input` component

The `Input` component is a useful component for quick usage of masking.

_Example:_

```javascript
import { Input } from "@maskin/react";
```

```jsx
<Input mask="xxx.xxx-##" />
```

## `withMaskin` higher-order component

The `withMaskin` function uses the higher-order component pattern to make a component _masked_.

_Example:_

```javascript
import { withMaskin } from "@maskin/react";
```

```jsx
const MyInput = props => <input type="text" {...props} />;

const MyMaskedInput = withMaskin()(MyInput);

<MyMaskedInput mask="(##) ### ####" />
```

## License

[MIT License](https://opensource.org/licenses/MIT)
