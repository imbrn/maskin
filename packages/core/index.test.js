import Maskin from ".";

test("default mask", () => {
  expect(Maskin("##-xx")("12")).toEqual("12");
  expect(Maskin("##-xx")("12")).toEqual("12");
  expect(Maskin("##-xx")("123")).toEqual("12");
  expect(Maskin("##-xx")("12-a")).toEqual("12-a");
  expect(Maskin("##-xx")("12a")).toEqual("12-a");
  expect(Maskin("##-xx")("1234-")).toEqual("12-");
  expect(Maskin("##-xx")("12-")).toEqual("12-");
  expect(Maskin("##-xx")("a12")).toEqual("12");
  expect(Maskin("##-xx")("a1b")).toEqual("1");
  expect(Maskin("##-xx")("a1b2c3d4")).toEqual("12-cd");
  expect(Maskin("ii-#")("Ab0")).toEqual("Ab-0");
  expect(Maskin("xX-#")("aB0")).toEqual("aB-0");
  expect(Maskin("xX-#")("Ab0")).toEqual("b");
  expect(Maskin("1_2")("1_2")).toEqual("1_2");
  expect(Maskin("1_2")("1_3")).toEqual("1_");
  expect(Maskin("1--")("1-")).toEqual("1-");
  expect(Maskin("1--")("1--")).toEqual("1--");
  expect(Maskin("1--X")("1-A")).toEqual("1--A");
});

test("raw mask", () => {
  expect(Maskin("##-xx")("12", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("12", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("123", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("12-a", { raw: true })).toEqual("12a");
  expect(Maskin("##-xx")("12a", { raw: true })).toEqual("12a");
  expect(Maskin("##-xx")("1234-", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("12-", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("a12", { raw: true })).toEqual("12");
  expect(Maskin("##-xx")("a1b", { raw: true })).toEqual("1");
  expect(Maskin("##-xx")("a1b2c3d4", { raw: true })).toEqual("12cd");
  expect(Maskin("ii-#")("Ab0", { raw: true })).toEqual("Ab0");
  expect(Maskin("xX-#")("aB0", { raw: true })).toEqual("aB0");
  expect(Maskin("xX-#")("Ab0", { raw: true })).toEqual("b");
  expect(Maskin("1_2")("1_2", { raw: true })).toEqual("");
  expect(Maskin("1_2")("1_3", { raw: true })).toEqual("");
  expect(Maskin("1--")("1-", { raw: true })).toEqual("");
  expect(Maskin("1--")("1--", { raw: true })).toEqual("");
  expect(Maskin("1--X")("1-A", { raw: true })).toEqual("A");
});

test("passing pattern as array", () => {
  expect(Maskin(["#", "#", "-", "x", "x"])("12-ab")).toBe("12-ab");
  expect(Maskin(["#", "#", "-", "x", "x"])("12ab")).toBe("12-ab");
});

test("passing RegExp objects as pattern parts", () => {
  expect(Maskin([/[a-z]/, "-", /[0-9]/])("a-0")).toBe("a-0");
  expect(Maskin([/[a-z]/, "-", /[0-9]/])("a0")).toBe("a-0");
  expect(Maskin([/[a-z]/, "-", /[0-9]/])("a-")).toBe("a-");
  expect(Maskin([/[a-z]/, "-", /[0-9]/])("A0")).toBe("");
});

test("both default and raw", () => {
  let result = Maskin("##-xx")("12", { raw: true, default: true });
  expect(result.default).toBe("12");
  expect(result.raw).toBe("12");

  result = Maskin("##-xx")("a1b2c3d4", { raw: true, default: true });
  expect(result.default).toBe("12-cd");
  expect(result.raw).toBe("12cd");
});
