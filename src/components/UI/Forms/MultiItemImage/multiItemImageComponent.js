import React, { useState, useEffect } from "react";
import { Select, Icon, Input, Alert, Avatar, Tooltip } from "antd";

import Button from "../Button";
import { getLibelleOf, isValidFiled } from "../../../../utils/utility";
import { buttons } from "../../../../constants/resources/Global";

export default ({
  onChange,
  items,
  value,
  name,
  disabled,
  handleChangePaysOS,
  hideFileName
}) => {
  const [pays, setPays] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errors, setError] = useState(false);

  useEffect(() => {
    if (isValidFiled(value)) {
      setPays(value);
    } else {
      setPays([]);
    }
  }, [value]);

  useEffect(() => {
    if (isValidFiled(pays) || pays === []) {
      handleChangePaysOS(pays);
    }
  }, [pays]);

  const handleChange = SelectedItem => {
    setError(false);
    setSelectedItem(SelectedItem);
  };

  const handleClick = () => {
    if (selectedItem) {
      let Value = selectedItem && JSON.parse(selectedItem);
      if (pays.findIndex(item => item.code === Value.code) === -1) {
        setPays(oldArray => [...oldArray, Value]);
        setSelectedItem(null);
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const handleRemove = code => {
    setPays(pays.filter(dt => dt.code !== code));
  };

  const getDeleteIcon = code => (
    <Tooltip title={buttons.deleteButton} trigger="hover">
      <Icon
        type="delete"
        style={{ color: "white", fontSize: 25 }}
        onClick={() => handleRemove(code)}
      />
    </Tooltip>
  );

  const getViewIcon = image => {
    return (
      <Tooltip title={buttons.consulter} trigger="hover">
        <a href={image} rel="noopener noreferrer" target="_blank">
          {/*href={`data:image;base64,${image}`}>*/}
          <Icon type="eye" style={{ color: "white", fontSize: 25 }} />
        </a>
      </Tooltip>
    );
  };

  return (
    <>
      {!disabled && (
        <>
          <Select
            value={selectedItem}
            onChange={handleChange}
            showSearch={true}
          >
            {isValidFiled(items) &&
              items.map((item, index) => {
                return (
                  <Select.Option
                    key={index + 1}
                    value={`${JSON.stringify(item)}`}
                  >
                    <Avatar src={item.src} />
                    <span className="selectLibelle">{item.libelle}</span>
                  </Select.Option>
                );
              })}
          </Select>
          <Button hideIcon color="primary" onClick={handleClick}>
            {buttons.addButton}
          </Button>
        </>
      )}
      {errors && <Alert message="Cette image est déjà ajouté" type="error" />}

      <div className="bloc">
        <Input name={name} onChange={onChange} value={pays} />
        <ul>
          {(pays || disabled) &&
            pays.map((item, index) => (
              <>
                <span class="polaroid">
                  <img src={item.src} alt={getLibelleOf(item)} class="image" />
                  <div class="middle">
                    <div class="text">
                      {getViewIcon(item.src)}
                      {getDeleteIcon(item.code)}
                    </div>
                  </div>
                  {!hideFileName && (
                    <span class="container">
                      <Tooltip title={getLibelleOf(item)} trigger="hover">
                        <p>{getLibelleOf(item)}</p>
                      </Tooltip>
                    </span>
                  )}
                </span>
              </>
            ))}
        </ul>
      </div>
    </>
  );
};
