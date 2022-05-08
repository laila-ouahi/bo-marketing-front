import React, { useState } from "react";
import moment from "moment";
import TextField from "../TextField/textFieldComponent";
import DatePicker from "../DatePicker/datePickerComponent";
import Select from "../Select/selectComponent";
import SelectEdit from "../SelectEdit/selectEditComponent";
import TextArea from "../TextArea/textAreaComponent";
import TextFieldNumber from "../TextFieldNumber/textFieldNumberComponent";
import MultiItem from "../MultiItem/multiItemComponent";
import MultiItemImage from "../MultiItemImage/multiItemImageComponent";
export default ({
  type,
  label,
  required,
  loading,
  error,
  value,
  name,
  setFieldValue,
  onChange,
  onDelete,
  onEdit,
  onSave,
  disabled,
  onBlur,
  items,
  iconInfo,
  addonAfter,
  noCopyPaste,
  uppercase,
  input,
  picker,
  number,
  etat,
  showAvatar,
  hideFileName,
  className
}) => {
  let field = null;
  const props = {
    type,
    label,
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
    className
  };

  const [textValue, setTextValue] = useState("");

  switch (type) {
    case "picker":
      field = (
        <DatePicker
          {...props}
          onChange={(_, dateString) =>
            dateString
              ? setFieldValue(moment(dateString, "DD/MM/YYYY"))
              : setFieldValue("")
          }
        />
      );
      break;
    case "select":
      field = (
        <Select
          {...props}
          onChange={event => {
            setFieldValue(event);
          }}
          items={items}
          showSearch={true}
        />
      );
      break;
    case "selectEdit":
      field = (
        <SelectEdit
          {...props}
          onChange={(event, values) => {
            if (values.props.value) {
              setFieldValue({
                code: values.props.value,
                libelle: values.props.children
              });
            } else {
              setFieldValue("");
            }
          }}
          items={items}
          showSearch={true}
        />
      );
      break;
    case "textarea":
      field = (
        <TextArea
          {...props}
          onChange={event => {
            setFieldValue(event.target.value);
          }}
          noCopyPaste={noCopyPaste}
        />
      );
      break;
    case "number":
      field = (
        <TextFieldNumber
          {...props}
          addonAfter={addonAfter}
          onChange={event =>
            typeof event === "number"
              ? setFieldValue(String(event))
              : setFieldValue(event)
          }
        />
      );
      break;
    case "multiItem":
      field = (
        <MultiItem
          {...props}
          handleChangePaysOS={event => {
            setFieldValue(event.toString());
          }}
          items={items}
        />
      );
      break;
    case "multiItemImage":
      field = (
        <MultiItemImage
          {...props}
          handleChangePaysOS={event => {
            setFieldValue(event);
          }}
          items={items}
        />
      );
      break;
    case "blurText":
      field = (
        <TextField
          {...props}
          addonAfter={addonAfter}
          noCopyPaste={noCopyPaste}
          value={textValue}
          onChange={event => setTextValue(event.target.value)}
          onBlur={event => {
            setFieldValue(
              uppercase ? event.target.value.toUpperCase() : event.target.value
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
              uppercase ? event.target.value.toUpperCase() : event.target.value
            )
          }
          onBlur={event => onBlur && onBlur(event.target.value)}
        />
      );
  }

  return <>{field}</>;
};
