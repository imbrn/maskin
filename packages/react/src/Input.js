import React, { PureComponent } from "react";
import Mask from "./Mask";

class Input extends PureComponent {
  render() {
    const { mask, defaultValue, ...rest } = this.props;
    return (
      <Mask pattern={mask} defaultValue={defaultValue}>
        {({ value, handleChange }) => (
          <input
            type="text"
            defaultValue={value}
            onChange={handleChange}
            {...rest}
          />
        )}
      </Mask>
    );
  }
}

export default Input;
