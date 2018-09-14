import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Input from "./Input";

afterEach(cleanup);

test("renders correctly", () => {
  const { container, getByTestId } = render(
    <Input data-testid="myInput" mask="###.xxx" />
  );
  expect(container).toBeDefined();
  expect(getByTestId("myInput")).toBeDefined();
});

test("data flow", () => {
  const { getByValue, getByPlaceholderText } = render(
    <Input placeholder="enter" mask="##.xx" defaultValue="12.ab" />
  );

  expect(getByValue("12.ab")).toBeDefined();

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "24ef" }
  });

  expect(getByValue("24.ef")).toBeDefined();
});
