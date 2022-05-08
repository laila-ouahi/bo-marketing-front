import React from "react";
import styled from "styled-components";
import { Form } from "antd";
import SelectComponent from "./selectComponent";

export default ({
  onChange,
  items,
  label,
  required,
  error,
  value,
  name,
  showSearch,
  onBlur,
  disabled,
  loading,
  hideListTooltip,
  className
}) => {
  return (
    <>
      <SelectEdit
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
        className={className}
      >
        <SelectComponent
          onChange={onChange}
          items={items}
          error={error}
          value={value}
          name={name}
          showSearch={showSearch}
          onBlur={onBlur}
          disabled={disabled}
          loading={loading}
          hideListTooltip={hideListTooltip}
        />
      </SelectEdit>
      {error && <div className="errors">{error}</div>}
    </>
  );
};

const SelectEdit = styled(props => <Form.Item {...props} />)`
  .ant-select-dropdown-menu {
    .ant-select-dropdown-menu-item {
      color: red;
    }
  }
  &.ant-form-item {
    margin-bottom: 25px;
    .ant-form-item-control {
      line-height: 33px;
    }
    .ant-select-selection__rendered {
      line-height: 36px;
    }
  }
  .ant-form-item-label {
    line-height: 25px;
    white-space: normal;
    text-align: left;
  }
  label {
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #646678 !important;
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
