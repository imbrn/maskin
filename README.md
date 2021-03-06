<h1 align="center">
  Maskin
</h1>

<p align="center">

<a href="https://github.com/imbrn/maskin/tree/master/packages/core/README.md">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" height="18"/>
  Core
</a> -   
<a href="https://github.com/imbrn/maskin/tree/master/packages/react/README.md">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="18"/>
  React
</a>

</p>

> ⚠️This project is just in an alpha stage and all its APIs are subject to
> change. We're also open to suggestions and PRs from all of you.

With Maskin you can provide your users a very natural way to input masked data.
Let your users think they are typing without software intervention. But it will
keep everything right.

Maskin is also really easy to configure and use. It provides you a lot of
flexibility in the way you declare your masking patterns.

## Sub-projects

_Choose one of the sub-projects that fits your needs better:_

- [Vanilla JS input/ouput masking](https://github.com/imbrn/maskin/tree/master/packages/core/README.md)

  _This project is a programming level utility for raw string input masking. It
  provides you a way to perform masking string to string._

  ```javascript
  import Maskin from "@maskin/core";

  const myMask = Maskin("###.xxx");
  myMask("123abc"); // 123.abc
  myMask("123.abc"); // 123.abc
  ```

- [React](https://github.com/imbrn/maskin/tree/master/packages/react/README.md)

  _This project provides you a lot of useful things as components, higher-order
  components, and functions for you to use in your react projects._

  Example of usage of the `Mask` component:

  ```jsx
  import { Mask } from "@maskin/react";

  <Mask pattern="###-##.xx">
    {({ value, handleChage }) => (
      <input type="text" onChange={handleChange} value={value} />
    )}
  </Mask>
  ```

  > Take a look at the project itself for more useful information about how to use it in
  > your react projects.

- [Vue](https://github.com/imbrn/maskin/tree/master/packages/vue/README.md)
  
  _(Coming soon...)_

- [Angular](https://github.com/imbrn/maskin/tree/master/packages/angular/README.md)
  
  _(Coming soon...)_

## License

This project and all its sub-projects are licensed by [MIT License](https://opensource.org/licenses/MIT).
