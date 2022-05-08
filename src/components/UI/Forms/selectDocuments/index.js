import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, Icon } from "antd";
import { stateIconsBO } from "../../../../constants/resources/Global";

const { Option } = Select;

export default props => {
  const [val, setVal] = useState(null);

  useEffect(() => {
    props.statut && setVal(String(props.statut));
  }, []);
  const handleChange = e => {
    setVal(e);
    props.handleSelect(e);
  };

  return (
    val && (
      <SelectDocumentStyled>
        <Select
          defaultValue={val}
          style={{ width: 60 }}
          className={`clsConforme ${
            String(val) === "1"
              ? "yellow"
              : String(val) === "2"
              ? "green"
              : "red"
          }`}
          onChange={e => handleChange(e)}
          disabled={props.disabled}
        >
          {stateIconsBO &&
            stateIconsBO.map(item => (
              <Option
                key={item.key}
                value={item.value}
                className={item.className}
              >
                <Icon type={item.icon} style={{ color: item.color }} />
              </Option>
            ))}
        </Select>
      </SelectDocumentStyled>
    )
  );
};

const SelectDocumentStyled = styled.div`
  .ant-select {
    &.clsConforme {
      width: 100px;
      text-align: center;
      &.yellow {
        color: #faad14 !important;
      }
      &.green {
        color: #52c41a !important;
      }
      &.red {
        color: #f5222d !important;
      }
      .ant-select-selection__rendered {
        margin-left: 12px;
      }
      .ant-select-selection-selected-value {
        font-family: "FontAwesome";
        font-size: 20px;
        font-family: "FontAwesome";
        padding: 0 !important;
        width: 25px;
      }
      &.yellow {
        .ant-select-selection-selected-value {
          color: #faad14 !important;
        }
      }
      &.green {
        .ant-select-selection-selected-value {
          color: #52c41a !important;
        }
      }
      &.red {
        .ant-select-selection-selected-value {
          color: #f5222d !important;
        }
      }
    }
  }
`;
