import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import withMask from "./withMask";

afterEach(cleanup);

test("default masking", () => {
  const CustomInput = ({ value, ...rest }) => (
    <input type="text" value={value} {...rest} />
  );

  const MaskedInput = withMask("##-xx")(CustomInput);

  const { getByPlaceholderText } = render(
    <MaskedInput placeholder="enter" defaultValue="12ab" />
  );

  expect(getByPlaceholderText("enter").value).toBe("12-ab");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "1234-" }
  });

  expect(getByPlaceholderText("enter").value).toBe("12-");
});

test("with raw option", () => {
  const CustomInput = ({ rawValue, ...rest }) => (
    <input type="text" value={rawValue} {...rest} />
  );

  const MaskedInput = withMask("##-xx")(CustomInput);

  const { getByPlaceholderText } = render(
    <MaskedInput raw placeholder="enter" defaultValue="12-ab" />
  );

  expect(getByPlaceholderText("enter").value).toBe("12ab");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "333a" }
  });

  expect(getByPlaceholderText("enter").value).toBe("33a");
});
