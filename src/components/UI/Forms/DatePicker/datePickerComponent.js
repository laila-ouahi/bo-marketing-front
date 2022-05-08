import React from "react";
import { DatePicker } from "antd";
export default ({ value, name, onChange, error, disabled }) => {
  const dateFormat = "DD/MM/YYYY";
  return (
    <DatePicker
      name={name}
      value={value || null}
      onChange={onChange}
      format={dateFormat}
      id={error && `error : ${error}`}
      disabled={disabled}
    />
  );
};
