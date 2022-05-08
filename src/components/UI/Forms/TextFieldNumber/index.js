import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import TextFieldNumberComponent from "./textFieldNumberComponent";

export default ({
  value,
  name,
  label,
  required,
  onChange,
  onBlur,
  error,
  disabled,
  addonAfter
}) => {
  return (
    <div>
      <TextFieldNumber
        addonAfter={addonAfter}
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <TextFieldNumberComponent
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          disabled={disabled}
        />
        {addonAfter && (
          <span className="ant-input-group-addon">{addonAfter}</span>
        )}
      </TextFieldNumber>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const TextFieldNumber = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
  }
  .ant-input-number {
    line-height: 38px;
    height: 40px;
    border-color: transparent;
    width: ${({ addonAfter }) => (!!addonAfter ? "79%;" : "100%;")};
  }
  .ant-input-group-addon {
    line-height: 38px;
    height: 40px;
    width: 20%;
    padding: 0px;
    margin: -5px 0 0 1px;
    background: #fff;
    border: none;
    color: #00979a;
    font-weight: bold;
    vertical-align: middle;
    display: inline-table;
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
