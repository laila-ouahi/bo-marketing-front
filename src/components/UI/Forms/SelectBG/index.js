import React, { useEffect, useState } from "react";
import { Select, Icon } from "antd";
import {
  conformiteStatut,
  stateIcons
} from "../../../../constants/resources/Global";
import Field from "../fields/boFields";
import { DoubleFieldComponent } from "../../../../constants/_styles";
import { getCodeOf } from "../../../../utils/utility";
import { getStringToUpperCase } from "../../../../utils/utilites/formatingUtilities";

export default ({
  onChange,
  items,
  label,
  error,
  value,
  name,
  onBlur,
  disabled,
  setTouched,
  val,
  ...props
}) => {
  const [firstBlockValue, setFirstBlockValue] = useState(null);
  const [secondeBlockValue, setSecondeBlockValue] = useState(null);

  const handleOnChangeFirstBlock = values => {
    console.log(
      "dddd",
      getCodeOf(values),
      getCodeOf(value && value.initialValeur),
      value.initialValeur,
      secondeBlockValue
    );
    if (
      getStringToUpperCase(getCodeOf(values)) ===
      getStringToUpperCase(getCodeOf(value && value.initialValeur))
    )
      onChange({
        ...value,
        valeur: values,
        statut: value.initialStatut || secondeBlockValue
      });
    else
      onChange({
        ...value,
        valeur: values,
        statut: conformiteStatut.nonEvalue
      });
  };

  const handleOnChangeSecondeBlock = event => {
    onChange({ ...value, valeur: firstBlockValue, statut: event });
  };

  useEffect(() => {
    console.log("valuevalue", value);
    if (value) {
      if (value.valeur || value.statut) {
        setFirstBlockValue(value.valeur);
        setSecondeBlockValue(value.statut);
      } else {
        setFirstBlockValue(value);
        setSecondeBlockValue(`${conformiteStatut.nonEvalue}`);
      }
    } else {
      setFirstBlockValue(null);
      setSecondeBlockValue(null);
    }
  }, [value]);

  const { Option } = Select;
  return (
    <div>
      <DoubleFieldComponent
        label={label}
        hasFeedback={error ? true : false}
        validateStatus={error && `error : ${error}`}
      >
        <span className={`clsConformeFirst`}>
          <Field
            value={firstBlockValue}
            items={items}
            setFieldValue={fieldValue => {
              handleOnChangeFirstBlock(fieldValue);
            }}
            disabled={disabled}
            setTouched={state => setTouched(state)}
            id={name}
            name={name}
            {...props}
          />
        </span>
        <Select
          onBlur={onBlur}
          name={name}
          value={secondeBlockValue}
          onChange={handleOnChangeSecondeBlock}
          showSearch={false}
          disabled={true}
          className={`clsConforme`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props &&
            option.props.children &&
            option.props.children.props &&
            option.props.children.props.title &&
            option.props.children.props.title
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          key={name}
          menuItemSelectedIcon={() => <Icon type="question-circle" />}
        >
          {stateIcons &&
            stateIcons.map(item => (
              <Option
                key={item.key}
                value={item.value}
                className={item.className}
              >
                <Icon type={item.icon} style={{ color: item.color }} />
              </Option>
            ))}
        </Select>
      </DoubleFieldComponent>

      {error && error.valeur ? (
        <div className="errors">{error && error.valeur}</div>
      ) : (
        error &&
        error.statut && <div className="errors">{error && error.statut}</div>
      )}
    </div>
  );
};
