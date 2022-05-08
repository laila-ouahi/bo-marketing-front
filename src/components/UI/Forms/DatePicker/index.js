import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import DatePickerComponent from "./datePickerComponent";

export default ({
  value,
  name,
  label,
  required,
  onChange,
  error,
  disabled
}) => {
  return (
    <div>
      <Picker
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <DatePickerComponent
          value={value}
          name={name}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
      </Picker>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const Picker = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
    white-space: normal;
    text-align: left;
  }
  label {
    line-height: normal;
    letter-spacing: normal;
    color: #646678 !important;
  }
  input {
    height: 38px;
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    color: #646678;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }
  .ant-calendar-picker {
    width: 100%;
  }
`;
