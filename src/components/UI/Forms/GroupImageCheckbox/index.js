import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Checkbox, Form, Tooltip } from "antd";
import {
  getCodeOf,
  getLibelleOf,
  isValidFiled
} from "../../../../utils/utility";
import { defaultImage } from "../../../../constants/resources/Global";
import SliderComponent from "../Slider";
import Spin from "../Spin";
import { libelle } from "../../../../constants/resources/Global";

export default ({
  value,
  error,
  required,
  name,
  label,
  onChange,
  items,
  disabled,
  hideFileName,
  loading
}) => {
  const [objectListe, setObjectListe] = useState([]);

  useEffect(() => {
    if (isValidFiled(items) && isValidFiled(value) && value[0].initialValue) {
      let mapedValue =
        isValidFiled(value) &&
        value.map(item => {
          const equivalentInListe =
            items &&
            items.find(
              element => String(element.code) === String(getCodeOf(item))
            );
          return equivalentInListe
            ? items.find(
                element => String(element.code) === String(getCodeOf(item))
              )
            : item;
        });
      if (value !== mapedValue) {
        setObjectListe(mapedValue);
      }
    }
  }, [value, items]);

  useEffect(() => {
    if (isValidFiled(objectListe) || objectListe === []) {
      onChange(objectListe);
    }
  }, [objectListe]);

  const handleChange = SelectedItem => {
    console.log("valuevalues handleChange ");

    if (isValidFiled(SelectedItem)) {
      let Value = JSON.parse(SelectedItem);
      if (objectListe.find(item => item.code === Value.code)) {
        setObjectListe(objectListe.filter(item => item.code !== Value.code));
      } else {
        setObjectListe(oldArray => [...oldArray, Value]);
      }
    }
  };

  const handleUncheckCheckbox = event => {
    console.log("valuevalues shandleUncheckCheckbox ");

    if (event.target && !event.target.checked) {
      let Value = JSON.parse(event.target.value);
      if (objectListe.find(item => item.code === Value.code)) {
        setObjectListe(objectListe.filter(item => item.code !== Value.code));
      }
    }
  };

  return (
    <StyledGroup>
      <Form.Item label={label} required={required}>
        {loading ? (
          <Spin tip={libelle.loading} />
        ) : disabled || !isValidFiled(items) ? (
          <div>
            {value &&
              value.map(object => (
                <div className="bloc">
                  <span class="polaroid gallery-cell">
                    <img
                      src={(object && object.src) || defaultImage}
                      alt={getLibelleOf(object) || null}
                      class="image"
                    />
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <Checkbox.Group
            name={name}
            value={value && JSON.stringify(value)}
            onChange={handleChange}
            items={items}
            disabled={disabled}
          >
            <SliderComponent length={isValidFiled(items) ? items.length : 0}>
              {(isValidFiled(items) || disabled) &&
                items.map(item => (
                  <div
                    className="bloc"
                    item={JSON.stringify(item)}
                    //onClick={handleClickChange}
                  >
                    <span class="polaroid gallery-cell">
                      <img
                        src={item.src || defaultImage}
                        alt={getLibelleOf(item)}
                        class="image"
                      />
                      {!hideFileName && (
                        <span class="container">
                          <Tooltip title={getLibelleOf(item)} trigger="hover">
                            <p>{getLibelleOf(item)}</p>
                          </Tooltip>
                          <Checkbox
                            value={JSON.stringify(item)}
                            onChange={handleUncheckCheckbox}
                          ></Checkbox>
                        </span>
                      )}
                    </span>
                  </div>
                ))}
            </SliderComponent>
          </Checkbox.Group>
        )}
      </Form.Item>
      {error && (
        <div className="errorsGroup" style={{ color: "#f5222d" }}>
          {error}
        </div>
      )}
    </StyledGroup>
  );
};

const StyledGroup = styled.div`
  .ant-spin-dot {
    font-size: 20px !important;
  }
`;
