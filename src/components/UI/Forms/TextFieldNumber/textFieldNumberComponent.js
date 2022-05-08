import React from "react";
import { InputNumber } from "antd";

export default ({ value, name, onChange, onBlur, error, disabled }) => {
  return (
    <span>
      <InputNumber
        allowClear={!disabled}
        name={name}
        formatter={nbr => `${nbr}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        id={error}
        disabled={disabled}
      />
    </span>
  );
};
