import React, { useEffect, useState } from "react";
import { Form, Tooltip, Icon, Spin } from "antd";
import styled from "styled-components";
import { getLibelleOf, showMessage } from "../../../../utils/utility";
import { buttons, defaultImage } from "../../../../constants/resources/Global";
import ImageInput from "./imageInput";
import PDFInput from "./pdfInput";

const ImageUpload = ({
  value,
  disabled,
  label,
  required,
  handleChangeFileList,
  onEdit,
  onSave,
  error
  //loading,
  //onChanged,
  //onDelete,
  // etat
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    value && setIndex(value.length);
  }, [value]);

  const getViewIcon = href => {
    return (
      <Tooltip title={buttons.consulter} trigger="hover">
        <a href={href} rel="noopener noreferrer" target="_blank">
          <Icon type="eye" style={{ color: "grey", fontSize: 25 }} />
        </a>
      </Tooltip>
    );
  };

  const getSaveIcon = item => (
    <Tooltip title={buttons.addButton} trigger="hover">
      <label>
        <form className="uploadForm">
          <Icon
            type={"upload"}
            style={{ color: "green", fontSize: 25 }}
            onClick={() => {
              handleSave(item);
            }}
          />
        </form>
      </label>
    </Tooltip>
  );

  const getSaveAgainIcon = item => (
    <Tooltip title={buttons.addreload} trigger="hover">
      <label>
        <form className="uploadForm">
          <Icon
            type={"sync"}
            style={{ color: "red", fontSize: 25 }}
            onClick={() => {
              handleSave(item);
            }}
          />
        </form>
      </label>
    </Tooltip>
  );

  /*const getEditIcon = item => (
    <Tooltip title={buttons.editButton} trigger="hover">
      <label>
        <form className="uploadForm">
          <Icon type="edit" style={{ color: "orange", fontSize: 25 }} />
          {staticImageInput(item)}
        </form>
      </label>
    </Tooltip>
  );

  const getDeleteIcon = item => (
    <Tooltip title={buttons.deleteButton} trigger="hover">
      <Icon
        type="delete"
        style={{ color: "red", fontSize: 25 }}
        onClick={() => {
          onDelete(item);
          handleRemove(item && item.code);
        }}
      />
    </Tooltip>
  );*/

  const handleSave = item => {
    Object.keys(value).forEach(key => {
      if (value[key].code === item.code) {
        let newarray = [...value];
        newarray[key].loading = true;
        handleChangeFileList(newarray);
      }
    });

    onSave &&
      onSave(item).then(response => {
        if (response.ok) {
          response.text().then(resp => {
            showMessage("success", "rattacherSignatureSuccess");
            Object.keys(value).forEach(key => {
              if (value[key].code === item.code) {
                let newarray = [...value];
                newarray[key].reference = resp;
                newarray[key].loading = false;
                newarray[key].file = null;
                newarray[key].error = false;
                handleChangeFileList(newarray);
              }
            });
          });
        } else {
          response.json().then(resp => {
            showMessage("error", resp.message);
            Object.keys(value).forEach(key => {
              if (value[key].code === item.code) {
                let newarray = [...value];
                newarray[key].loading = false;
                newarray[key].error = true;
                handleChangeFileList(newarray);
              }
            });
          });
        }
      });
  };

  /*const handleRemove = code => {
      handleChangeFileList(value.filter(dt => dt.code !== code));
    };*/

  return (
    <ImageUploadStyled
      label={label}
      required={required}
      hasFeedback={error ? true : false}
      validateStatus={error && `error : ${error}`}
    >
      <ImageInput
        index={index}
        setIndex={setIndex}
        value={value}
        disabled={disabled}
        handleChangeFileList={handleChangeFileList}
        onEdit={onEdit}
      />

      <PDFInput
        index={index}
        setIndex={setIndex}
        value={value}
        disabled={disabled}
        handleChangeFileList={handleChangeFileList}
        onEdit={onEdit}
      />
      <div className="bloc">
        <ul>
          {value &&
            value.map(item => (
              <span className="polaroid">
                <img
                  src={item.src || defaultImage}
                  alt={getLibelleOf(item)}
                  className="image"
                />
                {!disabled && (
                  <div className="middle">
                    <div
                      className={"loading"} //item.loading ? "loading" : ""}>
                    >
                      {item && (
                        <span>
                          {item.loading ? (
                            <Spin />
                          ) : (
                              <span>
                                <span>
                                  {getViewIcon(item.src || defaultImage)}
                                </span>
                                {item && item.reference ? (
                                  <span>
                                    {/*getEditIcon(item)}
                                    {getDeleteIcon(item)*/}
                                  </span>
                                ) : (
                                    <span>
                                      {item.error
                                        ? getSaveAgainIcon(item)
                                        : getSaveIcon(item)}
                                    </span>
                                  )}
                              </span>
                            )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {item.libelle && (
                  <span className="container">
                    <Tooltip title={item.libelle} trigger="hover">
                      <p>{item.libelle}</p>
                    </Tooltip>
                  </span>
                )}
              </span>
            ))}
        </ul>
      </div>
      {error && <div className="errorsUpload">{error}</div>}
    </ImageUploadStyled>
  );
};
export default ImageUpload;

const ImageUploadStyled = styled(props => <Form.Item {...props} />)`
  .ant-spin-dot {
    font-size: 20px !important;
  }
  .block {
    width: 100%;
  }

  .crop-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
  }

  .ant-upload-picture-card-wrapper {
    display: -webkit-box;
  }
  label {
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #646678 !important;
  }
  .errorsUpload {
    color: #f5222d;
    margin: 0;
    line-height: normal;
  }
  textarea {
    border-radius: 2px;
    box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-color: transparent;
    font-weight: bold;
    color: #646678;
    resize: none;
    height: 60px !important;
    &:disabled {
      background-color: #c5e4e5;
      opacity: 0.6;
      color: rgba(0, 0, 0, 0.55);
    }
  }
  .ant-btn {
    color: black;
  }
  .uploadForm {
    display: inline;
  }
`;
