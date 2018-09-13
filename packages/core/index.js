class Maskin {
  constructor(mask) {
    this.mask = mask.split("").map(char => getMask(char));
  }

  output(value) {
    this._process(value);
    return this._output.join("");
  }

  rawOutput(value) {
    this._process(value);
    return this._rawOutput.join("");
  }

  _process(value) {
    this._clear();
    this._value = value;

    let i = 0;
    let j = 0;

    while (i < value.length && j < this.mask.length) {
      if (isUnclassified(this.mask[j])) {
        if (!this.mask[j].match(value[i])) {
          this._prepend.push(this.mask[j].char);
          j++;
        } else {
          // Does not include unclassified chars in the raw value
          this._output.push(this.mask[j].char);
          j++;
        }
      } else {
        if (this.mask[j].match(value[i])) {
          this._output.push(...this._prepend);
          this._output.push(value[i]);
          this._rawOutput.push(value[i]); // Includes value in the raw output
          i++;
          j++;
        } else {
          i++;
        }
        this._prepend = [];
      }
    }

    this._output.push(...this._prepend);
  }

  _clear() {
    this._output = [];
    this._rawOutput = [];
    this._prepend = [];
  }
}

function isUnclassified(mask) {
  return mask instanceof UnclassifiedMask;
}

function getMask(char) {
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

const availableMasks = [NumberMask, StringMask, UnclassifiedMask];

export default Maskin;
