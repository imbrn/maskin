import React, { Fragment } from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Mask from "./Mask";

afterEach(cleanup);

test("renders correctly", () => {
  const { container } = render(<Mask />);
  expect(container).toBeDefined();
});

test("the children render function", () => {
  const children = jest.fn(() => <div>Hello</div>);
  render(<Mask>{children}</Mask>);
  expect(children).toHaveBeenCalled();
});

test("data flow", () => {
  const { getByPlaceholderText, getByTestId } = render(
    <Mask pattern="##-xx">
      {({ value, rawValue, handleChange }) => (
        <Fragment>
          <input placeholder="Value" value={value} onChange={handleChange} />
          <span data-testid="raw">{rawValue}</span>
        </Fragment>
      )}
    </Mask>
  );

  fireEvent.change(getByPlaceholderText("Value"), {
    target: { value: "12ab" }
  });

  expect(getByPlaceholderText("Value").value).toBe("12-ab");
  expect(getByTestId("raw").textContent).toBe("12ab");
});
