import React from "react";
import styled from "styled-components";
import { Select, Form } from "antd";
import { fields } from "./_resources";
import { Messages } from "../../../../constants/resources/Global";

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
  disabled
}) => {
  const { Option } = Select;

  return (
    <div>
      <List
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <Select
          onBlur={onBlur}
          name={name}
          value={value || ""}
          onChange={onChange}
          showSearch={showSearch}
          id={error && "error2"}
          disabled={disabled}
        >
          {items && (
            <Option key="0" value={undefined}>
              {" "}
              {Messages.emptySelectOptionName}{" "}
            </Option>
          )}
          {items &&
            items.map((item, index) => (
              <Option key={index + 1} value={`${item.code};${item.libelle}`}>
                {item.libelle}
              </Option>
            ))}
        </Select>
      </List>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const List = styled(props => <Form.Item {...props} />)`
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
      right: 8px !important;
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
