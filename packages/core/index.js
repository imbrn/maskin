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

function buildMaskClass(char) {
  const MaskClass = availableMasks.find(maskClass =>
    maskClass.compatible(char)
  );
  return new MaskClass(char);
}

class NumberMask {
  static compatible(char) {
    return char === "#";
  }

  match(value) {
    return /[0-9]/.test(value);
  }
}

class StringMask {
  constructor(char) {
    this.pattern = char === "x" ? /[a-z]/ : char === "X" ? /[A-Z]/ : /[a-z]/i;
  }

  static compatible(char) {
    return char === "x" || char === "X" || char === "i";
  }

  match(value) {
    return this.pattern.test(value);
  }
}

class RegExpMask {
  constructor(pattern) {
    this.pattern = pattern;
  }

  static compatible(part) {
    return part instanceof RegExp === true;
  }

  match(value) {
    return this.pattern.test(value);
  }
}

class UnclassifiedMask {
  static compatible() {
    return true;
  }

  constructor(char) {
    this.char = char;
  }

  match(value) {
    return value === this.char;
  }
}

const availableMasks = [NumberMask, StringMask, RegExpMask, UnclassifiedMask];

export default Maskin;
