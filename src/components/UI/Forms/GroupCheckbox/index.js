import React from "react";
import styled from "styled-components";
import { Checkbox } from "antd";

export default ({ value, error, name, label, onChange, items, disabled }) => {
  return (
    <div>
      <StyledGroupCheckbox>
        <span className="label">{label}</span>
        <Checkbox.Group
          name={name}
          value={value || ""}
          onChange={onChange}
          options={items}
          disabled={disabled}
        />
      </StyledGroupCheckbox>
      {error && (
        <div className="errorsGroup" style={{ color: "#f5222d" }}>
          {error}
        </div>
      )}
    </div>
  );
};
const StyledGroupCheckbox = styled.div`
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #646678 !important;
  .label {
    margin-right: 20px;
    margin-bottom: 35px;
    margin-top: 12px;
    display: inline-block;
  }
  &.ant-checkbox-wrapper {
    margin-top: 32px;
    margin-bottom: 34px;
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
`;
