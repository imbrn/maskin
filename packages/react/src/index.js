import Maskin from "@maskin/core";

export class SomeClassToTest {
  constructor(value) {
    const maskin = new Maskin("##-xx");
    this.value = maskin.output(value);
  }
}
