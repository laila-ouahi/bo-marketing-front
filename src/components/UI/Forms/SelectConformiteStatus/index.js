import React from "react";
import styled from "styled-components";
import { Select, Form, Icon } from "antd";
import { getCodeOf } from "../../../../utils/utility";
import { Messages, stateIconsBO } from "../../../../constants/resources/Global";

export default ({
  onChange,
  items,
  label,
  error,
  value,
  name,
  onBlur,
  disabled,
  val
}) => {
  const { Option } = Select;
  return (
    <div>
      <SelectEdit
        label={label}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <Select disabled={true} key={name + 1} value={val}>
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
        <Select
          onBlur={onBlur}
          name={name}
          value={value && value.code ? value.code : value || ""}
          onChange={onChange}
          showSearch={false}
          id={error && "error2"}
          disabled={
            value === null || val === null || val === undefined
              ? true
              : disabled
          }
          className={`clsConforme ${
            getCodeOf(value) === "1"
              ? "yellow"
              : getCodeOf(value) === "2"
              ? "green"
              : "red"
          }`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props &&
            option.props.children &&
            option.props.children.props &&
            option.props.children.props.title &&
            option.props.children.props.title
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          key={name}
          menuItemSelectedIcon={() => <Icon type="question-circle" />}
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
  .ant-select {
    width: 100px;
    @media (max-width: 768px) {
      width: 60px;
    }
    &.ant-select-disabled {
      width: calc(100% - 100px);
      @media (max-width: 768px) {
        width: calc(100% - 60px);
      }
    }
    &.clsConforme {
      width: 100px;
      @media (max-width: 768px) {
        width: 60px;
      }
      text-align: center;
      .ant-select-selection__rendered {
        margin-left: 30px;
        @media (max-width: 768px) {
          margin-left: 5px;
        }
      }
      .ant-select-selection-selected-value {
        font-family: "FontAwesome";
        font-size: 20px;
        font-family: "FontAwesome";
        padding: 0 !important;
        width: 25px;
      }

      &.yellow {
        .ant-select-selection-selected-value {
          color: #faad14 !important;
        }
      }
      &.green {
        .ant-select-selection-selected-value {
          color: #52c41a !important;
        }
      }
      &.red {
        .ant-select-selection-selected-value {
          color: #f5222d !important;
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
    .ant-select-arrow {
      margin-top: -7px;
      color: #b7b7b7;
      right: 11px !important;
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
