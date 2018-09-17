function Maskin(pattern) {
  if (typeof pattern === "string") {
    pattern = pattern.split("");
  }

  const mask = pattern.map(buildMaskClass);

  return (input, options = { raw: false, default: true }) => {
    const result = performMasking(mask, input);

    if (options.default && options.raw) {
      return result;
    } else if (options.raw) {
      return result.raw;
    } else {
      return result.default;
    }
  };
}

/*
Returns an object as result. This object contains both the default and raw
values.
Ex:
  for pattern: ##-xx, and input: 12-ab, result:
  {
    default: 12-ab
    raw: 12ab
  }
*/
function performMasking(mask, input) {
  const defaultOutput = [];
  const rawOutput = [];
  const prepend = [];

  let i = 0;
  let j = 0;

  while (i < mask.length && j < input.length) {
    if (prepend.length && prepend[0].match(input[j])) {
      const p = prepend.shift();
      defaultOutput.push(p.char);
      j++;
      continue;
    }

    if (mask[i].match(input[j])) {
      defaultOutput.push(...prepend.map(p => p.char));
      defaultOutput.push(input[j]);
      prepend.splice(0, prepend.length);

      if (isClassified(mask[i])) {
        rawOutput.push(input[j]);
      }

      i++;
      j++;
    } else {
      if (isClassified(mask[i])) {
        j++;
      } else {
        prepend.push(mask[i]);
        i++;
      }
    }
  }

  return {
    default: defaultOutput.join(""),
    raw: rawOutput.join("")
  };
}

function isClassified(mask) {
  return !(mask instanceof UnclassifiedMask);
}

function buildMaskClass(part) {
  if (part === "#") return new NumberMask();
  if (part === "x") return new StringMask(false); // lowercase
  if (part === "X") return new StringMask(true); // uppercase
  if (part === "i") return new StringMask(); // ignore case
  if (part instanceof RegExp) return new RegExpMask(part);
  return new UnclassifiedMask(part);
}

class NumberMask {
  match(value) {
    return /[0-9]/.test(value);
  }
}

class StringMask {
  constructor(upper) {
    this.pattern = upper === undefined ? /[a-z]/i : upper ? /[A-Z]/ : /[a-z]/;
  }

  match(value) {
    return this.pattern.test(value);
  }
}

class RegExpMask {
  constructor(pattern) {
    this.pattern = pattern;
  }

  match(value) {
    return this.pattern.test(value);
  }
}

class UnclassifiedMask {
  constructor(char) {
    this.char = char;
  }

  match(value) {
    return value === this.char;
  }
}

export default Maskin;
