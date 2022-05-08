import React, { useState, useEffect } from "react";
import { Select, Icon, Input, Alert } from "antd";

import Button from "../Button";
import { getLibelleValueOf, isValidFiled } from "../../../../utils/utility";
import { buttons } from "../../../../constants/resources/Global";

export default ({
  onChange,
  items,
  value,
  name,
  disabled,
  handleChangePaysOS
}) => {
  const [pays, setPays] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errors, setError] = useState(false);

  const handleChange = values => {
    setError(false);
    setSelectedItem(values);
  };

  const handleClick = () => {
    if (selectedItem) {
      if (pays.findIndex(item => item === selectedItem) === -1) {
        setPays(oldArray => [...oldArray, selectedItem]);
        setSelectedItem(null);
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const handleRemove = item => {
    setPays(pays.filter(dt => dt !== item));
    handleChangePaysOS(pays.filter(dt => dt !== item));
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setPays(value.split(","));
    } else {
      setPays([]);
    }
  }, [value]);

  useEffect(() => {
    if (isValidFiled(pays) || pays === []) {
      handleChangePaysOS(pays);
    }
  }, [pays]);

  return (
    <>
      {!disabled && (
        <>
          <Select
            value={selectedItem}
            name="valPays"
            onChange={handleChange}
            showSearch={true}
          >
            {isValidFiled(items) &&
              items.map((item, index) => (
                <Select.Option
                  key={index + 1}
                  value={`${item.code};${item.libelle}`}
                >
                  {item.libelle}
                </Select.Option>
              ))}
          </Select>
          <Button color="primary" onClick={handleClick}>
            {buttons.addButton}
          </Button>
        </>
      )}
      {errors && <Alert message="le pays est déjà ajouté" type="error" />}

      <div className="bloc">
        <Input name={name} onChange={onChange} value={pays} />
        <ul className="selectPays">
          {(pays || disabled) &&
            pays.map((item, index) => (
              <li key={index}>
                {getLibelleValueOf(item)}{" "}
                <b onClick={() => handleRemove(item)}>
                  {!disabled && <Icon type="close" />}
                </b>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
