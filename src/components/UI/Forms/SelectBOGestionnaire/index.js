import React from "react";
import styled from "styled-components";
import { Select, Form, Input, DatePicker, InputNumber, Icon } from "antd";
import { Messages, stateIconsBO } from "../../../../constants/resources/Global";
import { getCodeOfCastString } from "../../../../utils/utility";

export default ({
  onChange,
  items,
  label,
  error,
  value,
  name,
  onBlur,
  val,
  input,
  picker,
  number,
  disabled,
  addonAfter,
  noCopyPaste,
  uppercase,
  hideListTooltip,
  ...props
}) => {
  const { Option } = Select;
  const dateFormat = "DD/MM/YYYY";
  console.log("dateFormat", val, value);
  return (
    <div>
      <SelectEdit
        label={label}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        {input ? (
          <Input
            onCut={event => {
              noCopyPaste && event.preventDefault();
            }}
            onCopy={event => {
              noCopyPaste && event.preventDefault();
            }}
            onPaste={event => {
              noCopyPaste && event.preventDefault();
            }}
            allowClear={!disabled}
            maxLength={32}
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            id={error && "error2"}
            uppercase={uppercase}
            addonAfter={addonAfter}
            disabled={val === "2" || val === null ? true : disabled}
            required={null}
          />
        ) : picker ? (
          <DatePicker
            name={name}
            value={value || null}
            onChange={onChange}
            format={dateFormat}
            id={error && "error2"}
            disabled={val === "2" || val === null ? true : disabled}
            required={null}
          />
        ) : number ? (
          <InputNumber
            className="selectVal"
            allowClear={!disabled}
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            id={error && "error2"}
            disabled={val === "2" || val === null ? true : disabled}
            addonAfter={addonAfter}
            required={null}
            formatter={nbr => `${nbr}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          />
        ) : (
          <Select
            className="selectVal"
            onBlur={onBlur}
            name={name}
            value={
              value
                ? value.code && value.code !== ""
                  ? String(value.code)
                  : String(value) || ""
                : null
            }
            onChange={onChange}
            showSearch={true}
            id={error && "error2"}
            optionFilterProp="children"
            filterOption={(inputValue, option) =>
              option.props &&
              option.props.children &&
              option.props.children.props &&
              option.props.children.props.title &&
              option.props.children.props.title
                .toLowerCase()
                .indexOf(inputValue.toLowerCase()) >= 0
            }
            key={name}
            disabled={val === "2" ? true : disabled}
            required={null}
          >
            {items && (
              <Option key="0" value={undefined}>
                {" "}
                {Messages.emptySelectOptionName}{" "}
              </Option>
            )}
            {items &&
              items.map((item, index) => (
                <Select.Option key={index + 1} value={`${item.code}`}>
                  {item.libelle}
                </Select.Option>
              ))}
          </Select>
        )}
        <Select
          disabled={true}
          key={name + 1}
          value={val}
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
  &.ant-form-item {
    span {
      &.ant-form-item-children {
        width: 100%;
        float: left;
      }
    }
    margin-bottom: 25px;
    .ant-form-item-control {
      line-height: 33px;
    }
    .ant-select-selection__rendered {
      line-height: 36px;
      margin-right: 20px;
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
  .ant-input-affix-wrapper {
    width: calc(100% - 130px);
    @media (max-width: 768px) {
      width: 55%;
    }
  }
  .ant-calendar-picker {
    width: calc(100% - 130px);
    @media (max-width: 768px) {
      width: 55%;
    }
  }
  input {
    height: 41px;
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
  .ant-form-item-children {
    .selectVal {
      width: calc(100% - 130px);
      &.ant-input-number {
        border: none;
      }
      @media (max-width: 768px) {
        width: 55%;
      }
    }
    .clsConforme {
      float: right;
      .ant-select-selection-selected-value {
        float: none;
        text-align: center;
      }
    }
  }
  .ant-select {
    width: calc(100% - 130px);
    @media (max-width: 768px) {
      width: 55%;
    }
    &.selectVal {
      width: calc(100% - 130px);
      &.ant-input-number {
        border: none;
      }
      @media (max-width: 768px) {
        width: 55%;
      }
    }
    &.ant-select-disabled {
      width: 130px;
      @media (max-width: 768px) {
        width: 45%;
      }
      &.selectVal {
        width: calc(100% - 130px);
        &.ant-input-number {
          border: none;
        }
        @media (max-width: 768px) {
          width: 55%;
        }
      }
    }
  }
  .ant-select-selection {
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    font-weight: bold;
    color: #646678;
    .ant-select-selection-selected-value {
      padding-right: 0 !important;
      i {
        font-size: 17px;
      }
    }
    .ant-select-arrow {
      right: 5px !important;
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
