import Maskin from ".";

test("output", () => {
  expect(new Maskin("##-xx").output("12")).toEqual("12");
  expect(new Maskin("##-xx").output("123")).toEqual("12");
  expect(new Maskin("##-xx").output("12-")).toEqual("12-");
  expect(new Maskin("##-xx").output("12-a")).toEqual("12-a");
  expect(new Maskin("##-xx").output("12a")).toEqual("12-a");
  expect(new Maskin("##-xx").output("a12")).toEqual("12");
  expect(new Maskin("##-xx").output("a1b")).toEqual("1");
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
  expect(new Maskin("ii-#").rawOutput("Ab0")).toEqual("Ab0");
  expect(new Maskin("xX-#").rawOutput("aB0")).toEqual("aB0");
  expect(new Maskin("xX-#").rawOutput("Ab0")).toEqual("b");
  expect(new Maskin("1_2").rawOutput("1_2")).toEqual("");
});
