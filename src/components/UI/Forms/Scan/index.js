import React from "react";
import styled from "styled-components";
import { Icon, Form, Popover } from "antd";

const DisplayScan = ({ label, required, error }) => {
  return (
    <UploadStyled
      label={label}
      required={required}
      hasFeedback={error ? true : false}
      validateStatus={error && `error : ${error}`}
    >
      <p>
        <Icon
          type="check-circle"
          style={{ color: "#009699", fontSize: "30px" }}
        />
        <Popover title="Supprimer le fichier" trigger="hover">
          <Icon
            type="close-circle-o"
            style={{ color: "#FF0000", fontSize: "30px" }}
          />
        </Popover>
        <Popover title="Visualiser le fichier" trigger="hover">
          <Icon
            style={{ color: "#009699", fontSize: "30px" }}
            type="download"
          />
        </Popover>
      </p>
    </UploadStyled>
  );
};

const UploadStyled = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
  }
  .ant-form-item-control {
    line-height: 38px;
    height: 40px;
    .ant-upload-list {
      float: left;
      width: 100%;
    }
  }
  label {
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
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
    font-weight: bold;
    color: #646678;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
    p {
        float: right;
        span {
          font-size: 21px;
          color: #00979a;
          margin: 4px 10px;
          float: left;
          cursor: pointer;
        }
      }
    }
  }
`;

export default DisplayScan;
