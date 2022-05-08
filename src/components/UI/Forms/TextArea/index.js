import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import TextAreaComponent from "./textAreaComponent";

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
    <TextArea
      label={label}
      required={required}
      hasFeedback={error ? true : false}
      validateStatus={error && `error : ${error}`}
    >
      <TextAreaComponent
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        noCopyPaste={noCopyPaste}
      />
      {error && <div className="errorsTextArea">{error}</div>}
    </TextArea>
  );
};

const TextArea = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 35px;
  }
  .ant-form-item-label {
    line-height: 25px;
  }
  .ant-form-item-control {
    line-height: 38px;
    height: 40px;
  }
  label {
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #646678 !important;
  }
  .errorsTextArea {
    color: #f5222d;
    margin: 0;
    line-height: normal;
  }
  textarea {
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    font-weight: bold;
    color: #646678;
    resize: none;
    height: 60px !important;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }
`;
