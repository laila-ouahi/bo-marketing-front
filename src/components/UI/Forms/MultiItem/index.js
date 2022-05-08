import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import MultiItemComponent from "./multiItemComponent";

export default ({
  onChange,
  items,
  label,
  required,
  error,
  value,
  name,
  disabled,
  handleChangePaysOS
}) => {
  return (
    <MultiItem
      label={label}
      required={required}
      hasFeedback={error ? true : false}
      validateStatus={error && `error : ${error}`}
    >
      <MultiItemComponent
        onChange={onChange}
        items={items}
        value={value}
        name={name}
        disabled={disabled}
        handleChangePaysOS={handleChangePaysOS}
      />
      {error && <div className="errorsMultiItem">{error}</div>}
    </MultiItem>
  );
};

const MultiItem = styled(props => <Form.Item {...props} />)`
  width: 100%;
  float: left;
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
  .bloc {
    float: left;
    width: 100%;
    margin-top: 12px;
    .ant-input {
      display: none;
    }
    span {
      display: inline-block;
      font-weight: bold;
      font-style: normal;
      font-size: 14px;
      color: #646678 !important;
      float: left;
    }
    .selectPays {
      display: inline-block;
      padding: 0;
      margin: 5px 0 0 15px;
      float: left;
      li {
        padding: 6px 20px;
        height: auto;
        line-height: normal;
        position: relative;
        margin-right: 45px;
        margin-bottom: 5px;

        overflow: visible;
        color: rgba(0, 0, 0, 0.65);
        background-color: #f3f3f3;
        border: 1px solid #dbdbdb;
        border-radius: 2px;
        float: left;
        list-style-type: none;
        b {
          position: absolute;
          top: 2px;
          font-size: 18px;
          right: -25px;
          i {
            background: #b3b3b3;
            border-radius: 2px;
            svg {
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              padding: 2px;
            }
          }
        }
      }
    }
    .selectBloc {
      display: none;
      width: auto !important;
      margin: 0 0 0 10px !important;
      visibility: hidden;
      .ant-select-selection {
        height: 40px;
        border-radius: 2px;
        box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
        background-color: transparent;
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
          background-color: transparent;
          opacity: 1;
          cursor: auto;
          border-color: transparent !important;
        }
      }
      .ant-select-selection {
        ul {
          li {
            padding: 6px 20px;
            height: auto;
            line-height: normal;
            position: relative;
            margin-right: 35px;
            overflow: visible;
            > div {
              color: #646678 !important;
            }
            .ant-select-selection__choice__remove {
              display: inherit !important;
              position: absolute;
              right: -25px;
              top: 6px;
              background: #b3b3b3;
              width: 20px;
              height: 20px;
              padding: 0;
              border-radius: 4px;
              line-height: 19px;
              color: #f7f8f9 !important;
              font-size: 12px;
              font-weight: bold;
            }
            &.ant-select-search {
              display: none;
            }
          }
        }
      }
    }
  }
`;
