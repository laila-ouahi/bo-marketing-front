import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import { getCodeOf, isValidFiled } from "../../../../utils/utility";

const { Option } = Select;

const SelectImportExport = ({
  record,
  dataPays,
  onChange,
  name,
  dataGlobal
}) => {
  return (
    <SelecImportStyled>
      <Select
        name={name}
        showSearch={true}
        filterOption={(input, option) =>
          option.props &&
          isValidFiled(option.props.children) &&
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={
          record.pays ? getCodeOf(record.pays) : getCodeOf(record.autorite)
        }
        style={{ width: 150 }}
        onChange={onChange}
        disabled={String(record.statut) === "2" ? true : false}
      >
        {dataPays &&
          dataPays.map(item => {
            return <Option value={item.code}>{item.libelle}</Option>;
          })}
      </Select>
    </SelecImportStyled>
  );
};

const SelecImportStyled = styled.div`
  .erreur {
    color: red;
    margin: 0;
    font-size: 13px;
  }
`;

export default SelectImportExport;
