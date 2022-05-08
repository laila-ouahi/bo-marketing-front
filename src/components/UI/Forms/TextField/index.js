import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import TextFieldComponent from "./textFieldComponent";

export default ({
  value,
  name,
  label,
  required,
  onChange,
  onBlur,
  error,
  disabled,
  addonAfter,
  noCopyPaste,
  uppercase
}) => {
  return (
    <div>
      <TextField
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <TextFieldComponent
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          disabled={disabled}
          addonAfter={addonAfter}
          noCopyPaste={noCopyPaste}
          uppercase={uppercase}
          maxLength
        />
      </TextField>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const TextField = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
  }
  .ant-form-item-control {
    line-height: 38px;
    height: 40px;
    .ant-input-group-addon {
      background: #fff;
      border: none;
      color: #00979a;
      font-weight: bold;
    }
  }
  label {
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
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
    font-weight: bold;
    color: #646678;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }
`;
