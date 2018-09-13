import { SomeClassToTest } from ".";

test("tests are working", () => {
  const clazz = new SomeClassToTest("10");
  expect(clazz.value).toBe("10");
});
