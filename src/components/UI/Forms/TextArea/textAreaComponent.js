import React from "react";
import { Input } from "antd";

export default ({
  value,
  name,
  onChange,
  onBlur,
  error,
  disabled,
  noCopyPaste
}) => {
  return (
    <Input.TextArea
      onCut={event => {
        noCopyPaste && event.preventDefault();
      }}
      onCopy={event => {
        noCopyPaste && event.preventDefault();
      }}
      onPaste={event => {
        noCopyPaste && event.preventDefault();
      }}
      name={name}
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      id={error && "error2"}
      disabled={disabled}
    />
  );
};
