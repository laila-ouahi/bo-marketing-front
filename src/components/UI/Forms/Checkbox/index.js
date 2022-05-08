import React from "react";
import styled from "styled-components";
import { Checkbox, Icon } from "antd";

export default ({
  value,
  error,
  name,
  label,
  onChange,
  disabled,
  caret,
  onClick,
  margCheckbox
}) => {
  return (
    <div>
      <StyledCheckbox
        value={value}
        name={name}
        onChange={onChange}
        checked={value}
        disabled={disabled}
        className={margCheckbox}
      >
        {label} {caret && <Icon type="caret-down" onClick={onClick} />}
      </StyledCheckbox>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const StyledCheckbox = styled(props => <Checkbox {...props} />)`
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #646678 !important;
  &.ant-checkbox-wrapper {
    margin-top: 32px;
    margin-bottom: 34px;
    &.margCheckbox {
      margin-top: 5px;
      margin-bottom: 15px;
    }
  }
  input[type="checkbox"] {
    width: 24px;
    height: 24px;
  }
  .ant-checkbox-inner {
    width: 24px;
    height: 24px;

    &::after {
      display: table;
      width: 7.014286px;
      height: 11.142857px;
      left: 33%;
    }
  }
  .ant-checkbox-disabled {
    + span {
      color: #fff !important;
      &:last-child {
        color: #646678 !important;
      }
    }
  }
`;
