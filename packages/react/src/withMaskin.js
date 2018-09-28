import React from "react";
import Mask from "./Mask";

function withMask() {
  return Comp => {
    return ({ defaultValue, mask, raw, onChange, ...rest }) => (
      <Mask pattern={mask} defaultValue={defaultValue}>
        {({ value, rawValue, handleChange }) => {
          const finalOnChange = e => {
            handleChange(e);
            if (onChange) onChange(e);
          };
          const compValue = raw ? rawValue : value;
          return <Comp {...rest} onChange={finalOnChange} value={compValue} />;
        }}
      </Mask>
    );
  };
}

export default withMask;
