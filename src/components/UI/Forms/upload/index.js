import React from "react";
import styled from "styled-components";
import { Upload, Icon, Form } from "antd";

const FileUpload = ({
  value,
  name,
  label,
  required,
  fileList,
  onChanged,
  error,
  etat
}) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div>
      {etat ? (
        <div>
          <UploadStyled
            label={label}
            required={required}
            hasFeedback={error ? true : false}
            validateStatus={error && `error : ${error}`}
          >
            <Upload.Dragger
              fileList={fileList}
              onChange={onChanged}
              customRequest={dummyRequest}
              beforeUpload={file => {
                return false;
              }}
            >
              <Icon type="upload" /> Click to Upload
            </Upload.Dragger>
          </UploadStyled>
          {error && <div className="errors">{error}</div>}
        </div>
      ) : null}
    </div>
  );
};

const UploadStyled = styled(props => <Form.Item {...props} />)`
  &.ant-form-item {
    margin-bottom: 25px;
  }
  .ant-form-item-label {
    line-height: 25px;
    white-space: normal;
    text-align: left;
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
  }
`;

export default FileUpload;
