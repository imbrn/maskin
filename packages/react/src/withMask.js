import React from "react";
import Mask from "./Mask";

function withMask(pattern) {
  return Comp => {
    return ({ defaultValue, raw, ...rest }) => (
      <Mask pattern={pattern} defaultValue={defaultValue}>
        {({ value, rawValue, handleChange }) => {
          const compValue = raw ? rawValue : value;
          return <Comp {...rest} onChange={handleChange} value={compValue} />;
        }}
      </Mask>
    );
  };
}

export default withMask;
