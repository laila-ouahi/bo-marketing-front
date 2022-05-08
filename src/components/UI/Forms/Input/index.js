import React from "react";
import styled from "styled-components";
import { Icon } from "antd";

export default ({ value, name, label, onChange, onSubmit }) => {
  return (
    <StyledInput
      accept="application/pdf"
      //  style={{ display: "none" }}
      type="file"
      onChange={onChange}
    >
      <Icon type="paper-clip" style={{ fontSize: "30px" }} />
    </StyledInput>
  );
};

const StyledInput = styled(props => <input {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
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

  .ant-calendar-picker {
    width: 100%;
  }
`;
