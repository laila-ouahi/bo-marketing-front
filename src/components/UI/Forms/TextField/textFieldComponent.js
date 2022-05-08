import React from "react";
import { Input } from "antd";

export default ({
  value,
  name,
  onChange,
  onBlur,
  error,
  disabled,
  addonAfter,
  noCopyPaste,
  uppercase,
  maxLength
}) => {
  return (
    <Input
      step="100"
      onCut={event => {
        noCopyPaste && event.preventDefault();
      }}
      onCopy={event => {
        noCopyPaste && event.preventDefault();
      }}
      onPaste={event => {
        noCopyPaste && event.preventDefault();
      }}
      onCompositionUpdate={event => {
        noCopyPaste && event.preventDefault();
      }}
      allowClear={!disabled}
      maxLength={maxLength || 32}
      name={name}
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      id={error && "error2"}
      disabled={disabled}
      uppercase={uppercase}
      addonAfter={addonAfter}
    />
  );
};
