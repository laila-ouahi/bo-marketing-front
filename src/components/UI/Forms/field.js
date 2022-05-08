import React, { useState } from "react";
import moment from "moment";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import Select from "./Select";
import SelectEdit from "./SelectEdit";
import Password from "./Password";
import GroupCheckbox from "./GroupCheckbox";
import GroupImageCheckbox from "./GroupImageCheckbox";
import GroupImageRadioButton from "./GroupImageRadioButton";
import Button from "./Button";
import TextArea from "./TextArea";
import TextFieldNumber from "./TextFieldNumber";
import FileUpload from "./upload";
import ImageUpload from "./uploadImage";
import MultiItem from "./MultiItem";
import MultiItemImage from "./MultiItemImage";
import Radio from "./Radio";
import SelectConforme from "./SelectConforme";
import SelectBOGestionnaire from "./SelectBOGestionnaire";
import SelectBG from "./SelectBG";
import SelectBO from "./SelectBO";
import FileDownload from "./Download";
import { isValidFiled } from "../../../utils/utility";
import SelectStatut from "./SelectStatut";
import Switch from "./Switch";
import {
  doubleFieldList,
  formItems
} from "../../../constants/resources/Global";

export default ({
  type,
  label,
  doubleField,
  required,
  loading,
  error,
  value,
  name,
  setFieldValue,
  setTouched,
  onChange,
  onDelete,
  onEdit,
  onSave,
  disabled,
  onBlur,
  options,
  iconInfo,
  onClick,
  addonAfter,
  fieldsSelect,
  noCopyPaste,
  uppercase,
  val,
  input,
  picker,
  number,
  etat,
  showAvatar,
  hideFileName,
  onChangeBO,
  dataIndex,
  className
}) => {
  const props = {
    type,
    label,
    doubleField,
    required,
    loading,
    error,
    value,
    onChange,
    onDelete,
    onEdit,
    onSave,
    onBlur,
    name,
    disabled,
    iconInfo,
    input,
    picker,
    number,
    etat,
    showAvatar,
    hideFileName,
    className,
    setTouched
  };

  const [fileList, setfileList] = useState([]);
  const [textValue, setTextValue] = useState("");

  let field = null;

  switch (doubleField) {
    case doubleFieldList.fieldBO:
      field = (
        <SelectBO
          {...props}
          onChange={event => {
            if (fieldsSelect) {
              fieldsSelect.map(item => setFieldValue(item.name, item.value));
            }
            setFieldValue(name, event);
          }}
          items={options}
        />
      );
      break;
    case doubleFieldList.fieldBG:
      field = (
        <SelectBG
          {...props}
          onChange={event => {
            if (fieldsSelect) {
              fieldsSelect.map(item => setFieldValue(item.name, item.value));
            }
            setFieldValue(name, event);
          }}
          items={options}
        />
      );
      break;
    default:
      switch (type) {
        case formItems.title:
          field = <h3>{label}</h3>;
          break;
        case formItems.picker:
          field = (
            <DatePicker
              {...props}
              onChange={(_, dateString) =>
                dateString
                  ? setFieldValue(name, moment(dateString, "DD/MM/YYYY"))
                  : setFieldValue(name, "")
              }
            />
          );
          break;
        case formItems.checkbox:
          field = (
            <Checkbox
              {...props}
              onChange={event => setFieldValue(name, event.target.checked)}
            />
          );
          break;

        case formItems.switch:
          field = (
            <Switch
              {...props}
              onChange={event => {
                setFieldValue(name, event);
              }}
            />
          );
          break;

        case formItems.groupCheckbox:
          field = (
            <GroupCheckbox
              {...props}
              items={options}
              onChange={event => setFieldValue(name, event)}
            />
          );
          break;
        case formItems.groupImageCheckbox:
          field = (
            <GroupImageCheckbox
              {...props}
              onChange={(event, firstLoading) => {
                if (!firstLoading) {
                  if (isValidFiled(fieldsSelect)) {
                    fieldsSelect.map(item =>
                      setFieldValue(item.name, item.value)
                    );
                    setTouched(true);
                  } else {
                    setTouched(false);
                  }
                }
                if (event) {
                  setFieldValue(name, event);
                } else {
                  setFieldValue(name, null);
                }
              }}
              items={options}
            />
          );
          break;

        case formItems.groupImageRadioButton:
          field = (
            <GroupImageRadioButton
              {...props}
              onChange={(event, firstLoading) => {
                if (!firstLoading) {
                  if (isValidFiled(fieldsSelect)) {
                    fieldsSelect.map(item =>
                      setFieldValue(item.name, item.value)
                    );
                    setTouched(true);
                  } else {
                    setTouched(false);
                  }
                }
                if (event) {
                  setFieldValue(name, event);
                } else {
                  setFieldValue(name, null);
                }
              }}
              items={options}
            />
          );
          break;

        case "select":
          field = (
            <Select
              {...props}
              onChange={(event, firstLoading) => {
                if (!firstLoading) {
                  if (isValidFiled(fieldsSelect)) {
                    fieldsSelect.map(item =>
                      setFieldValue(item.name, item.value)
                    );
                    setTouched(true);
                  } else {
                    setTouched(false);
                  }
                }
                if (event) {
                  setFieldValue(name, event);
                } else {
                  setFieldValue(name, null);
                }
              }}
              items={options}
              showSearch={true}
            />
          );
          break;

        case formItems.selectStatut:
          field = (
            <SelectStatut
              {...props}
              onChange={(event, values) => {
                if (fieldsSelect) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                }

                if (values.props.value) {
                  setFieldValue(name, event);
                } else {
                  setFieldValue(name, "");
                }
              }}
            />
          );
          break;
        case formItems.selectEdit:
          field = (
            <SelectEdit
              {...props}
              onChange={(event, values) => {
                if (isValidFiled(fieldsSelect)) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                  setTouched(true);
                } else {
                  setTouched(false);
                }

                if (values.props.value) {
                  setFieldValue(name, {
                    code: values.props.value,
                    libelle: values.props.children
                  });
                } else {
                  setFieldValue(name, "");
                }
              }}
              items={options}
              showSearch={true}
            />
          );
          break;
        case formItems.selectConforme:
          field = (
            <SelectConforme
              {...props}
              onChange={(event, values) => {
                if (fieldsSelect) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                }

                if (values.props.value) {
                  setFieldValue(name, {
                    code: values.props.value,
                    libelle: values.props.children
                  });
                } else {
                  setFieldValue(name, "");
                }
              }}
              val={val}
              items={options}
            />
          );
          break;
        case formItems.selectBOGestionnaire:
          field = (
            <SelectBOGestionnaire
              {...props}
              onChange={(event, values) => {
                if (fieldsSelect) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                }
                if (input) {
                  setFieldValue(
                    name,
                    uppercase
                      ? event.target.value.toUpperCase()
                      : event.target.value
                  );
                } else if (picker) {
                  values
                    ? setFieldValue(name, moment(values, "DD/MM/YYYY"))
                    : setFieldValue(name, "");
                } else if (number) {
                  setFieldValue(name, event);
                } else {
                  if (values.props.value) {
                    setFieldValue(name, {
                      code: values.props.value,
                      libelle: values.props.children
                    });
                  } else {
                    setFieldValue(name, "");
                  }
                }
              }}
              addonAfter={addonAfter}
              noCopyPaste={noCopyPaste}
              input={input}
              picker={picker}
              number={number}
              val={val}
              items={options}
              showSearch={true}
            />
          );
          break;
        case formItems.password:
          field = (
            <Password
              {...props}
              onChange={event => setFieldValue(name, event.target.value)}
            />
          );
          break;
        case formItems.button:
          field = (
            <Button type="button" color="primary" onClick={onClick}>
              {label}
            </Button>
          );
          break;
        case formItems.textArea:
          field = (
            <TextArea
              {...props}
              onChange={event => {
                if (isValidFiled(fieldsSelect)) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                  setTouched(true);
                } else {
                  setTouched(false);
                }
                setFieldValue(name, event.target.value);
              }}
              noCopyPaste={noCopyPaste}
            />
          );
          break;
        case formItems.number:
          field = (
            <TextFieldNumber
              {...props}
              addonAfter={addonAfter}
              onChange={event =>
                typeof event === "number"
                  ? setFieldValue(name, String(event))
                  : setFieldValue(name, event)
              }
            />
          );
          break;
        case formItems.multiItem:
          field = (
            <MultiItem
              {...props}
              handleChangePaysOS={(event, firstLoading) => {
                if (isValidFiled(fieldsSelect)) {
                  fieldsSelect.map(item =>
                    setFieldValue(item.name, item.value)
                  );
                  setTouched(true);
                } else {
                  setTouched(false);
                }

                setFieldValue(name, event.toString());
              }}
              items={options}
            />
          );
          break;
        case formItems.multiItemImage:
          field = (
            <MultiItemImage
              {...props}
              handleChangePaysOS={event => {
                setFieldValue(name, event);
              }}
              items={options}
            />
          );
          break;
        case formItems.upload:
          field = (
            <FileUpload
              fileList={fileList}
              onChanged={info => {
                let filesList = [...info.fileList];
                filesList = filesList.slice(-1);
                filesList = filesList.map(file => {
                  if (file.response) {
                    file.url = file.response.url;
                  }
                  return file;
                });
                setfileList(filesList);
                setFieldValue("file", info.file);
              }}
              {...props}
            />
          );
          break;
        case formItems.imageUpload:
          field = (
            <ImageUpload
              handleChangeFileList={imageList => {
                setFieldValue(name, imageList);
              }}
              {...props}
            />
          );
          break;
        case formItems.download:
          field = <FileDownload type="download" onClick={onClick} {...props} />;
          break;
        case formItems.radio:
          field = (
            <Radio
              {...props}
              onChange={event => {
                setFieldValue(name, event.target.value);
              }}
              items={options}
            />
          );
          break;
        case formItems.blurText:
          field = (
            <TextField
              {...props}
              addonAfter={addonAfter}
              noCopyPaste={noCopyPaste}
              value={textValue}
              onChange={event => setTextValue(event.target.value)}
              onBlur={event => {
                setFieldValue(
                  name,
                  uppercase
                    ? event.target.value.toUpperCase()
                    : event.target.value
                );
                onBlur && onBlur(event.target.value);
              }}
            />
          );
          break;
        default:
          field = (
            <TextField
              {...props}
              addonAfter={addonAfter}
              noCopyPaste={noCopyPaste}
              onChange={event =>
                setFieldValue(
                  name,
                  uppercase
                    ? event.target.value.toUpperCase()
                    : event.target.value
                )
              }
              onBlur={event => onBlur && onBlur(event.target.value)}
            />
          );
      }
  }

  return <>{field}</>;
};
