import React, { useEffect, useState } from "react";
import { Select, Icon } from "antd";
import { stateIcons } from "../../../../constants/resources/Global";
import Field from "../fields/boFields";
import { DoubleFieldComponent } from "../../../../constants/_styles";

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
    onChange({ valeur: values, statut: secondeBlockValue });
  };

  const handleOnChangeSecondeBlock = event => {
    onChange({ valeur: firstBlockValue, statut: event });
  };

  useEffect(() => {
    console.log("valuevalue", value);
    if (value) {
      setFirstBlockValue(value.valeur);
      setSecondeBlockValue(value.statut);
    } else {
      setFirstBlockValue(null);
      setSecondeBlockValue(null);
    }
  }, [value]);

  useEffect(() => {
    console.log("valuevalue error", error);
  }, [error]);

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
            setTouched={state => setTouched(state)}
            id={name}
            disabled={true}
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
          disabled={disabled}
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
