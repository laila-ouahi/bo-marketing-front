import React from "react";
import styled from "styled-components";
import { Select, Form, Icon } from "antd";

import { getCodeOf, getCodeOfCastString } from "../../../../utils/utility";
import { stateIconsBO } from "../../../../constants/resources/Global";

export default ({
  label,
  required,
  error,
  value,
  name,
  onBlur,
  disabled,
  onChange
}) => {
  const { Option } = Select;
  return (
    <div>
      <SelectEdit
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <Select
          onBlur={onBlur}
          name={name}
          value={getCodeOf(value) || ""}
          id={error}
          onChange={onChange}
          disabled={disabled}
          key={name}
          className={`clsConforme ${
            getCodeOfCastString(value) === "1"
              ? "yellow"
              : getCodeOfCastString(value) === "2"
              ? "green"
              : "red"
          }`}
        >
          {stateIconsBO &&
            stateIconsBO.map(item => (
              <Option
                key={item.key}
                value={item.value}
                className={item.className}
              >
                <Icon type={item.icon} style={{ color: item.color }} />
              </Option>
            ))}
        </Select>
      </SelectEdit>
      {error && <div className="errors">{error}</div>}
    </div>
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
      .ant-select-selection-selected-value {
        float: none;
        text-align: center;
        i {
          font-size: 17px;
        }
      }
    }
    .ant-select-selection__rendered:after {
      content: none;
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
