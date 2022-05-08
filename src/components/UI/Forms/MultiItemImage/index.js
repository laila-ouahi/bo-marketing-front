import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import MultiItemImageComponent from "./multiItemImageComponent";

export default ({
  onChange,
  items,
  label,
  required,
  error,
  value,
  name,
  disabled,
  handleChangePaysOS,
  hideFileName
}) => {
  return (
    <MultiItem
      label={label}
      required={required}
      hasFeedback={error ? true : false}
      validateStatus={error && `error : ${error}`}
    >
      <MultiItemImageComponent
        onChange={onChange}
        items={items}
        value={value}
        name={name}
        disabled={disabled}
        handleChangePaysOS={handleChangePaysOS}
        hideFileName={hideFileName}
      />
      {error && <div className="errorsMultiItem">{error}</div>}
    </MultiItem>
  );
};

const MultiItem = styled(props => <Form.Item {...props} />)`
  width: 100%;
  float: left;
  list-style-type: disc;

  .selectLibelle {
    margin-left: 10px;
  }
  &.ant-form-item {
    margin-bottom: 25px;
    .ant-form-item-control {
      .ant-select {
        width: calc(50% - 20px);
        @media (max-width: 900px) {
          width: 100%;
        }
        margin-right: 20px;
      }
      button {
        width: calc(50% - 20px);
        margin-buttom: 5px;
        @media (max-width: 900px) {
          width: auto;
          float: center;
          margin: 5px 25% 5px;
        }
        margin: 0 0 0 20px;
      }
    }
    .ant-select-selection__rendered {
      line-height: 36px;
    }
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
  .errorsMultiItem {
    color: #f5222d;
    margin: -15px 0 0 0;
  }
  .ant-select-selection {
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    font-weight: bold;
    color: #646678;
    .ant-select-arrow {
      margin-top: -7px;
      color: #b7b7b7;
      font-size: 16px;
    }
  }
  .ant-select-disabled {
    .ant-select-selection {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }

  .anticon-info-circle {
    position: absolute;
    top: -1px;
    font-size: 18px;
    right: -25px;
    color: "rgba(0,0,0,.45)";
  }
`;
