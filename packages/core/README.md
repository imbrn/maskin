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
