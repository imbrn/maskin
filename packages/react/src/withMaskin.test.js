import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import withMaskin from "./withMaskin";

afterEach(cleanup);

test("default masking", () => {
  const CustomInput = ({ value, ...rest }) => (
    <input type="text" value={value} {...rest} />
  );

  const MaskedInput = withMaskin()(CustomInput);

  const { getByPlaceholderText } = render(
    <MaskedInput placeholder="enter" mask="##-xx" defaultValue="12ab" />
  );

  expect(getByPlaceholderText("enter").value).toBe("12-ab");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "1234-" }
  });

  expect(getByPlaceholderText("enter").value).toBe("12-");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "23ab" }
  });

  expect(getByPlaceholderText("enter").value).toBe("23-ab");
});

test("with raw option", () => {
  const CustomInput = ({ rawValue, ...rest }) => (
    <input type="text" value={rawValue} {...rest} />
  );

  const MaskedInput = withMaskin()(CustomInput);

  const { getByPlaceholderText } = render(
    <MaskedInput raw placeholder="enter" mask="##-xx" defaultValue="12-ab" />
  );

  expect(getByPlaceholderText("enter").value).toBe("12ab");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "333a" }
  });

  expect(getByPlaceholderText("enter").value).toBe("33a");

  fireEvent.change(getByPlaceholderText("enter"), {
    target: { value: "333ab" }
  });

  expect(getByPlaceholderText("enter").value).toBe("33ab");
});

test("onChange", () => {
  const MyInput = props => <input type="text" {...props} />;

  const MaskedInput = withMaskin()(MyInput);

  const myOnChange = jest.fn();

  const { getByPlaceholderText } = render(
    <MaskedInput mask="xx.XX" onChange={myOnChange} placeholder="input" />
  );

  fireEvent.change(getByPlaceholderText("input"), {
    target: { value: "abCD" }
  });

  expect(getByPlaceholderText("input").value).toBe("ab.CD");
  expect(myOnChange).toHaveBeenCalled();

  fireEvent.change(getByPlaceholderText("input"), {
    target: { value: "daTA" }
  });

  expect(getByPlaceholderText("input").value).toBe("da.TA");
  expect(myOnChange).toHaveBeenCalledTimes(2);
});
