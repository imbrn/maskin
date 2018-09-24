import React from "react";
import Mask from "./Mask";

const Input = ({ mask, defaultValue, ...rest }) => (
  <Mask pattern={mask} defaultValue={defaultValue}>
    {({ value, handleChange }) => (
      <input {...rest} type="text" value={value} onChange={handleChange} />
    )}
  </Mask>
);

export default Input;
