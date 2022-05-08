import React, { useEffect } from "react";
import styled from "styled-components";

import { Form, Tooltip, Radio } from "antd";
import SliderComponent from "../Slider";
import { getLibelleOf, isValidFiled } from "../../../../utils/utility";
import { defaultImage, libelle } from "../../../../constants/resources/Global";

import Spin from "../Spin/index";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getReferenceOf } from "../../../../utils/utility";

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
  useEffect(() => {
    console.log("valuevalue", { value, items });
    if (isValidFiled(items) && isValidFiled(value) && value.initialValue) {
      const equivalentInListe =
        items &&
        items.find(
          item => String(item.reference) === String(getReferenceOf(value))
        );
      if (!equivalentInListe) {
        onChange(null);
      } else if (equivalentInListe && !getLibelleOf(value)) {
        onChange(equivalentInListe, true);
      }
    }
  }, [value, items]);

  const handleChange = event => {
    let targetValue =
      event &&
      event.target &&
      event.target.value &&
      JSON.parse(event.target.value);
    onChange(targetValue);
  };

  const handleClickChange = event => {
    let targetValue =
      event &&
      event.currentTarget &&
      event.currentTarget.attributes &&
      event.currentTarget.attributes.getNamedItem("item") &&
      event.currentTarget.attributes.getNamedItem("item").value &&
      JSON.parse(event.currentTarget.attributes.getNamedItem("item").value);
    onChange(targetValue);
  };

  return (
    <StyledGroupImageRadioButton>
      <Form.Item label={label} required={required}>
        {loading ? (
          <Spin tip={libelle.loading} />
        ) : disabled || !isValidFiled(items) ? (
          <div className="bloc">
            <span class="polaroid gallery-cell">
              <img
                src={(value && value.src) || defaultImage}
                alt={getLibelleOf(value) || null}
                class="image"
              />
            </span>
          </div>
        ) : (
          <Radio.Group
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
                    onClick={handleClickChange}
                  >
                    <span class="polaroid gallery-cell">
                      <img
                        src={item.src || defaultImage}
                        alt={getLibelleOf(item)}
                        class="image"
                      />
                      <span class="container">
                        {!hideFileName && (
                          <Tooltip title={getLibelleOf(item)} trigger="hover">
                            <p>{getLibelleOf(item)}</p>
                          </Tooltip>
                        )}
                        <Radio value={JSON.stringify(item)}></Radio>
                      </span>
                    </span>
                  </div>
                ))}
            </SliderComponent>
          </Radio.Group>
        )}
      </Form.Item>

      {error && (
        <div className="errorsGroup" style={{ color: "#f5222d" }}>
          {error}
        </div>
      )}
    </StyledGroupImageRadioButton>
  );
};

const StyledGroupImageRadioButton = styled.div`
  .ant-spin-dot {
    font-size: 20px !important;
  }
`;
