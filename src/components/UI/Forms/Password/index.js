import React from "react";
import styled from "styled-components";
import { Input, Form } from "antd";

export default ({
  value,
  name,
  label,
  required,
  onChange,
  onBlur,
  error,
  disabled,
  noCopyPaste
}) => {
  return (
    <div>
      <TextField
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <Input.Password
          onCut={event => {
            noCopyPaste && event.preventDefault();
          }}
          onCopy={event => {
            noCopyPaste && event.preventDefault();
          }}
          onPaste={event => {
            noCopyPaste && event.preventDefault();
          }}
          allowClear
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          id={error && "error2"}
          disabled={disabled}
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
      background-color: #fff;
    }
  }
`;
