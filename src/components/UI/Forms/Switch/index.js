import React, { useEffect, useState } from "react";
import { Form, Switch } from "antd";
import styled from "styled-components";

export default ({
  value,
  label,
  required,
  onChange,
  error,
  disabled,
  loading,
  ...props
}) => {
  const getBooleanValue = val => {
    return val === 1 ? true : false;
  };
  const getNoneBooleanValue = val => {
    return val ? 1 : 2;
  };

  const [switchValue, setSwitchValue] = useState(getBooleanValue(value));

  const handleOnChange = val => {
    setSwitchValue(val);
  };

  useEffect(() => {
    getNoneBooleanValue(switchValue) !== value &&
      onChange(getNoneBooleanValue(switchValue));
  }, [switchValue]);

  return (
    <div>
      <StyledSwitch
        label={label}
        required={required}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <Switch
          size="small"
          checkedChildren="Oui"
          unCheckedChildren="Non"
          checked={switchValue}
          onChange={handleOnChange}
          disabled={disabled}
          loading={loading}
        />
      </StyledSwitch>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

const StyledSwitch = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
    white-space: normal;
    text-align: left;
  }
  label {
    //font-weight: bold;
    //font-style: normal;
    //font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #646678 !important;
  }
  input {
    height: 38px;
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    //font-weight: bold;
    color: #646678;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }
  .ant-calendar-picker {
    width: 100%;
  }
`;
