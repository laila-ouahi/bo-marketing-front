import React from "react";
import { Button } from "antd";
import styled from "styled-components";

export default ({
  children,
  type,
  color,
  onClick,
  disabled,
  hidden,
  loading
}) => {
  return (
    <ButtonStyled
      type={color}
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(props => <Button {...props} />)`
  &.ant-btn {
    height: 40px;
    border-radius: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
    padding: 4px 6px 4px 10px;
    line-height: 27px;
    text-transform: uppercase;
    font-size: 10px;
    min-width: 80px;
    text-align: left;
    margin: 0 10px;
  }
`;
