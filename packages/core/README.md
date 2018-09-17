# Maskin core

Core module of the [maskin](https://github.com/imbrn/maskin) library.
This module provides an API for data masking operations in programming level.

```javascript
import Maskin from "@maskin/core";

const mask = Maskin("##-xx");

mask("12-ab"); // 12-ab
mask("12ab"); // 12-ab
mask("1234"); // 12
mask("12-"); // 12
mask("1a2b3c4d"); // 12cd
```

## Masking classes

- **Number (#)**

  Use the symbol (#) to indicate that you expect a number for the character in
  the input.

  _Ex:_

  ```javascript
  const mask = Maskin("## ##");
  mask("12 34"); // "12 34"
  mask("12abc"); // "12"
  ```

- **String (x, X, i)**

  To indicate that you want a string character, use the symbols _x_, _X_, or
  _i_, for lowercase character, uppercase and insensitive case, respectively.

  _Ex:_

  ```javascript
  const mask = Maskin("xX ii");
  mask("aB cD"); // aB cD
  mask("aB Cd"); // aB Cd
  ```

- **Regular expression**

  You can use regular expression to define what kind of characters you expect in
  your pattern. _Keep in mind that this kind of feature is available only if you
  define your pattern as an array._

  _Ex:_

  ```javascript
  const mask = Maskin([/[a-z]/, "-", /[0-9]/]);
  mask("a-0"); // a-0
  mask("b3"); // b-3
  ```

  > Note that each item of the pattern array corresponds to only one character
  > when the masking is performed.

- **Unclassified masking**

  You can define an unclassified character as part of your masking pattern. An
  unclassified character is matched only with itself, and it's not included as
  part of the raw version of the masking result.

  _Ex:_

  ```javascript
  // The dot (.) and the dash (-) characters are unclassified characters.
  const mask = Maskin("#.#-#");
  mask("1.2-3"); // 1.2-3
  mask("123"); // 1.2-3
  ```
