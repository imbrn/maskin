import Maskin from ".";

test("output", () => {
  expect(new Maskin("##-xx").output("12")).toEqual("12");
  expect(new Maskin("##-xx").output("123")).toEqual("12");
  expect(new Maskin("##-xx").output("12-")).toEqual("12-");
  expect(new Maskin("##-xx").output("12-a")).toEqual("12-a");
  expect(new Maskin("##-xx").output("12a")).toEqual("12-a");
  expect(new Maskin("##-xx").output("a12")).toEqual("12");
  expect(new Maskin("##-xx").output("a1b")).toEqual("1");
  expect(new Maskin("##-xx").output("a1b2c3d4")).toEqual("12-cd");
  expect(new Maskin("ii-#").output("Ab0")).toEqual("Ab-0");
  expect(new Maskin("xX-#").output("aB0")).toEqual("aB-0");
  expect(new Maskin("xX-#").output("Ab0")).toEqual("b");
  expect(new Maskin("1_2").output("1_2")).toEqual("1_2");
});

test("rawOutput", () => {
  expect(new Maskin("##-xx").rawOutput("12")).toEqual("12");
  expect(new Maskin("##-xx").rawOutput("123")).toEqual("12");
  expect(new Maskin("##-xx").rawOutput("12-")).toEqual("12");
  expect(new Maskin("##-xx").rawOutput("12-a")).toEqual("12a");
  expect(new Maskin("##-xx").rawOutput("12a")).toEqual("12a");
  expect(new Maskin("##-xx").rawOutput("a12")).toEqual("12");
  expect(new Maskin("##-xx").rawOutput("a1b")).toEqual("1");
  expect(new Maskin("##-xx").rawOutput("a1b2c3d4")).toEqual("12cd");
  expect(new Maskin("ii-#").rawOutput("Ab0")).toEqual("Ab0");
  expect(new Maskin("xX-#").rawOutput("aB0")).toEqual("aB0");
  expect(new Maskin("xX-#").rawOutput("Ab0")).toEqual("b");
  expect(new Maskin("1_2").rawOutput("1_2")).toEqual("");
});

test("execute", () => {
  let result = new Maskin("##-xx").execute("12");
  expect(result.output).toBe("12");
  expect(result.rawOutput).toBe("12");

  result = new Maskin("##-xx").execute("12-a");
  expect(result.output).toBe("12-a");
  expect(result.rawOutput).toBe("12a");

  result = new Maskin("1_2").execute("1_");
  expect(result.output).toBe("1_");
  expect(result.rawOutput).toBe("");
});
