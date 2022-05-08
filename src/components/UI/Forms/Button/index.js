import React from "react";
import { Button, Icon } from "antd";
import styled from "styled-components";

export default ({
  children,
  type,
  color,
  onClick,
  disabled,
  hidden,
  loading,
  hideIcon,
  className
}) => {
  return (
    <ButtonStyled
      type={color}
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
      className={className}
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
    color: #000;
    padding: 4px;
    line-height: 27px;
    text-transform: uppercase;
    font-size: 13px;
    @media (max-width: 1024px) {
      font-size: 8px;
    }
    @media (max-width: 768px) {
      font-size: 8px;
    }
    @media (max-width: 375px) {
      font-size: 8px;
    }
    text-align: left;
    margin: 2px;
    &.btnTop {
      &[disabled] {
        .icon {
          background-color: transparent !important;
        }
      }
      .icon {
        top: 6px !important;
        i {
          color: #00626b !important;
        }
      }
    }
    .icon {
      float: right;
      border-radius: 25px;
      text-align: center;
      background: #fff;
      color: #009699;
      width: 25px;
      height: 25px;
      font-size: 16px;
      @media (max-width: 1024px) {
        font-size: 15px;
      }
      @media (max-width: 768px) {
        font-size: 13px;
      }
      @media (max-width: 375px) {
        font-size: 12px;
      }
      margin-left: 10px;
    }
  }
`;
