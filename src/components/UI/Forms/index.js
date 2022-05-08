import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { Alert } from "antd";
import map from "lodash/map";
import Field from "./field";
import Button from "./Button";
import * as Global from "../../../constants/resources/Global";

export default ({
  loading,
  initialValues,
  validationSchema,
  onCancelSubmit,
  onSubmit,
  onSubmitCapture,
  onChangeCapture,
  fields,
  submitText,
  cancelSubmitText,
  classBO,
  fieldFluid,
  fieldBO,
  fieldTwoColumns,
  errors,
  enableReinitialize,
  emptyForm,
  table,
  fieldSearch,
  visible,
  addonAfter,
  fieldsSelect,
  disabledSubmit,
  showRequiredStar
}) => {
  const [cancel, setCancel] = useState(false);
  let ua = navigator.userAgent;
  let is_InternetExplorer =
    ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

  useEffect(() => {
    !cancelSubmitText && setCancel(false);
  }, [cancelSubmitText]);

  const handleSubmitButton = () => (
    <Button
      type="submit"
      color="primary"
      loading={loading}
      disabled={disabledSubmit}
    >
      {submitText}
    </Button>
  );
  const handleCancelSubmitButton = () => (
    <Button
      type="reset"
      color="primary"
      loading={loading}
      onClick={() => {
        setCancel(true);
        setTimeout(() => {
          onCancelSubmit && onCancelSubmit();
        }, 1000);
      }}
    >
      {cancelSubmitText}
    </Button>
  );

  return (
    <FormStyle
      is_InternetExplorer={is_InternetExplorer}
      className={`
      ${fieldFluid ? "fieldFluid" : ""} 
      ${fieldSearch ? "fieldSearch" : ""}
      ${fieldBO ? "fieldBO" : ""}
      ${fieldTwoColumns ? "fieldTwoColumns" : ""}
      `}
    >
      {visible && (
        <Alert message={Global.Messages.formSuccess} type="success" />
      )}
      <Formik
        isInitialValid={true}
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        validationSchema={!cancel && validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            onSubmit(values);
            emptyForm && actions.resetForm({});
          }, 1000);
        }}
      >
        {props => {
          return (
            <Form
              onSubmitCapture={() => {
                onSubmitCapture && onSubmitCapture(props.values);
              }}
              onChangeCapture={
                onChangeCapture &&
                onChangeCapture(
                  props.values,
                  props.isValid,
                  props.dirty,
                  props.touched
                )
              }
            >
              {errors && <Alert message={errors} type="error" />}

              {map(fields, (field, name) => {
                const required =
                  showRequiredStar &&
                  validationSchema &&
                  validationSchema.describe() &&
                  {}.toString.call(validationSchema.describe) ===
                    "[object Function]" &&
                  validationSchema.describe().fields &&
                  validationSchema.describe().fields[name] &&
                  validationSchema.describe().fields[name].tests &&
                  validationSchema
                    .describe()
                    .fields[name].tests.find(
                      testName => testName && testName.name === "required"
                    )
                    ? true
                    : false;
                return (
                  field && (
                    <>
                      <div
                        className={`field ${field.class} ${
                          field.fluid ? "fluid" : ""
                        } ${field.fieldRight ? "fieldRight" : ""} ${
                          field.class === "hidden" ? "hidden" : ""
                        }`}
                        key={name}
                      >
                        <Field
                          setFieldValue={(fieldName, fieldValue) => {
                            props.setFieldValue(fieldName, fieldValue);
                            if (field.onChange) {
                              field.onChange(fieldValue);
                            }
                            if (field.selectWithValue) {
                              props.setFieldValue(
                                field.fieldName,
                                field.fieldValue
                              );
                            }
                          }}
                          required={required}
                          setTouched={state => props.setTouched(state)}
                          fieldsSelect={fieldsSelect}
                          name={name}
                          id={name}
                          addonAfter={addonAfter}
                          value={
                            field.value
                              ? field.value
                              : props.values
                              ? props.values[name]
                              : null
                          }
                          error={props.errors[name]}
                          {...field}
                        />
                      </div>
                      {field.border && <div className="border"></div>}
                    </>
                  )
                );
              })}
              {table}

              <div>
                {cancelSubmitText ? (
                  <div className={`formButton ${classBO}`}>
                    {submitText && (
                      <div className="buttonLeft">{handleSubmitButton()}</div>
                    )}
                    <div className="buttonRight">
                      {handleCancelSubmitButton()}
                    </div>
                  </div>
                ) : (
                  submitText && (
                    <div className={`formButton ${classBO}`}>
                      <div className="buttonLeft">&nbsp;</div>
                      <div className="buttonRight">{handleSubmitButton()}</div>
                    </div>
                  )
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormStyle>
  );
};

const FormStyle = styled.div`
  float: left;
  width: 100%;
  .ant-form-item-label {
    label {
      display: -webkit-box;
      @media (min-width: 768px) {
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: ${({ is_InternetExplorer }) =>
          is_InternetExplorer ? "nowrap;" : "none;"};
      }
    }
    white-space: normal;
    text-align: left;
  }
  .ant-form-item-label,
  .ant-select-selection,
  .ant-select ant-select-enabled,
  .errors,
  .selectOptions,
  .errorsMultiItem,
  .errorsTextArea,
  span,
  input {
    font-size: 14px;
    @media (max-width: 1440px) {
      font-size: 12px;
    }
    @media (max-width: 1024px) {
      font-size: 10px;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (max-width: 375px) {
      font-size: 9px;
    }
  }
  .ant-form-item-label,
  .ant-select-selection,
  .ant-select ant-select-enabled,
  input {
    font-weight: bold;
  }

  form {
    text-align: left;
    .ant-alert {
      margin: 10px 20px;
    }
  }
  .field {
    float: left;
    width: auto;
    @media (min-width: 2000px) {
      min-width: 300px;
    }
    @media (max-width: 2000px) {
      width: 33.33%;
      &.fluid {
        width: 100%;
      }
    }
    @media (max-width: 1600px) {
      width: 50%;
      &.fluid {
        width: 100%;
      }
    }
    @media (max-width: 900px) {
      width: 100%;
    }
    padding: 0 20px;
    min-height: 100px;
    @media (max-width: 900px) {
      min-height: 80px;
    }
    .errors {
      color: #f5222d;
      margin: -25px 0 0;
      width: 100%;
      float: left;
    }
    &.margin {
      min-height: 60px;
      label {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    &.title {
      width: 100%;
      min-height: auto;
      margin-bottom: 15px;
      h3 {
        color: #009da0;
        font-weight: 700;
        font-size: 17px;
      }
    }
    &.fluid {
      width: 100%;
    }
    &.hidden {
      display: none;
    }
    &.fieldRight {
      float: right;
    }
    &.clearfix {
      margin-right: 80%;
      @media (max-width: 1600px) {
        margin-right: 10%;
      }
      @media (max-width: 900px) {
        margin-right: 0;
      }
    }
  }
  .formButton {
    margin: 10px 0 20px;
    float: left;
    width: 100%;
    text-align: center;
    .buttonLeft {
      display: inline-block !important;
      wax-width: 50%;
      padding: 10px 10px;
      margine-left: 25%;
    }
    .buttonRight {
      display: inline-block !important;
      wax-width: 50%;
      padding: 10px 10px;
      margine-right: 25%;
    }
    &.classBO {
      margin: 30px 0 20px;
    }
  }
  &.fieldTwoColumns {
    .field {
      width: auto;
      @media screen and (min-width: 3000px) {
        min-width: 300px;
      }
      @media screen and (max-width: 3000px) {
        width: 50%;
      }
      @media screen and (max-width: 1200px) {
        width: 100%;
      }

      &.clearfix {
        margin-right: 80%;
        @media (max-width: 3000px) {
          margin-right: 10%;
        }
        @media (max-width: 1200px) {
          margin-right: 0;
        }
      }
      &.fluid {
        width: 100%;
      }
    }
  }
  &.fieldBO {
    .field {
      width: auto;
      @media screen and (min-width: 3000px) {
        min-width: 300px;
        &.fluid {
          width: 100%;
        }
      }
      @media screen and (max-width: 3000px) {
        width: 33.33%;
        &.fluid {
          width: 100%;
        }
      }
      @media screen and (max-width: 2000px) {
        width: 50%;
        &.fluid {
          width: 100%;
        }
      }
      @media screen and (max-width: 1400px) {
        width: 100%;
      }

      &.clearfix {
        margin-right: 80%;
        @media (max-width: 2000px) {
          margin-right: 10%;
        }
        @media (max-width: 1400px) {
          margin-right: 0;
        }
      }
    }
  }
  &.fieldSearch {
    .field {
      width: auto;
      @media screen and (min-width: 2000px) {
        min-width: 300px;
      }
      @media screen and (max-width: 2000px) {
        width: 33.33%;
      }
      @media screen and (max-width: 1024px) {
        width: 50%;
      }
      @media screen and (max-width: 768px) {
        width: 100%;
      }

      &.clearfix {
        margin-right: 80%;
        @media (max-width: 1024px) {
          margin-right: 10%;
        }
        @media (max-width: 768px) {
          margin-right: 0;
        }
      }
    }
    .formButton {
      .buttonRight {
        text-align: right;
      }
    }
  }
  &.fieldFluid {
    .field {
      width: 100%;
    }
    .formButton {
      .buttonRight {
        float: right;
        width: auto;
      }
    }
  }
  .border {
    border: 1px dashed #00979a;
    margin: 15px 0 25px;
  }

  .bloc {
    float: left;
    //width: 100%;
    margin-top: 12px;
    .ant-input {
      display: none;
    }
    span {
      display: inline-block;
      font-weight: bold;
      font-style: normal;
      font-size: 14px;
      color: #646678 !important;
      float: left;
    }
    .selectPays {
      display: inline-block;
      padding: 0;
      margin: 5px 0 0 15px;
      float: left;
      li {
        padding: 6px 20px;
        height: auto;
        line-height: normal;
        position: relative;
        margin-right: 45px;
        margin-bottom: 5px;

        overflow: visible;
        color: rgba(0, 0, 0, 0.65);
        background-color: #f3f3f3;
        border: 1px solid #dbdbdb;
        border-radius: 2px;
        float: left;
        list-style-type: none;
        b {
          position: absolute;
          top: 2px;
          font-size: 18px;
          right: -25px;
          i {
            background: #b3b3b3;
            border-radius: 2px;
            svg {
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              padding: 2px;
            }
          }
        }
      }
    }
    .selectBloc {
      display: none;
      width: auto !important;
      margin: 0 0 0 10px !important;
      visibility: hidden;
      .ant-select-selection {
        height: 40px;
        border-radius: 2px;
        box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
        background-color: transparent;
        border-color: transparent;
        font-weight: bold;
        color: #646678;
        .ant-select-arrow {
          margin-top: -7px;
          color: #b7b7b7;
          font-size: 16px;
        }
      }
      .ant-select-disabled {
        .ant-select-selection {
          background-color: transparent;
          opacity: 1;
          cursor: auto;
          border-color: transparent !important;
        }
      }
      .ant-select-selection {
        ul {
          li {
            padding: 6px 20px;
            height: auto;
            line-height: normal;
            position: relative;
            margin-right: 35px;
            overflow: visible;
            > div {
              color: #646678 !important;
            }
            .ant-select-selection__choice__remove {
              display: inherit !important;
              position: absolute;
              right: -25px;
              top: 6px;
              background: #b3b3b3;
              width: 20px;
              height: 20px;
              padding: 0;
              border-radius: 4px;
              line-height: 19px;
              color: #f7f8f9 !important;
              font-size: 12px;
              font-weight: bold;
            }
            &.ant-select-search {
              display: none;
            }
          }
        }
      }
    }

    .polaroid {
      position: relative;
      padding: 5px;
      width: 200px;
      margin: 20px;
      @media (max-width: 1440px) {
        width: 150px;
        margin: 15px;
      }
      @media (max-width: 1024px) {
        width: 140px;
        margin: 10px;
      }
      @media (max-width: 900px) {
        width: 130px;
      }
      @media (max-width: 768px) {
        width: 120px;
      }
      @media (max-width: 375px) {
        width: 100px;
      }
      background-color: white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      margin-bottom: 25px;
      .container {
        text-align: center;
        padding: 10px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        width: 90%;
      }
      img {
        width: 100%;
        height: 200px;
        overflow: hidden;
        @media (max-width: 1440px) {
          height: 150px;
        }
        @media (max-width: 1024px) {
          height: 140px;
        }
        @media (max-width: 900px) {
          height: 130px;
        }
        @media (max-width: 768px) {
          height: 120px;
        }
        @media (max-width: 375px) {
          height: 100px;
        }
      }
      .middle {
        transition: 0.5s ease;
        opacity: 0;
        position: absolute;
        left: 50%;
        top: 110px;
        @media (max-width: 1440px) {
          top: 85px;
        }
        @media (max-width: 1024px) {
          top: 80px;
        }
        @media (max-width: 900px) {
          top: 75px;
        }
        @media (max-width: 768px) {
          top: 70px;
        }
        @media (max-width: 375px) {
          top: 60px;
        }
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }

      .loading {
        .image {
          opacity: 0.7;
          background-color: black;
        }
        .middle {
          opacity: 1;
        }
      }
    }

    .polaroid:hover .image {
      opacity: 0.7;
      background-color: black;
    }

    .polaroid:hover .middle {
      opacity: 1;
    }
  }

  .ant-avatar {
    margin-right: 10px;
  }
`;
