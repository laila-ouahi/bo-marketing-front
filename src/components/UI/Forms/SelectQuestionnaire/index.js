import React, { useState } from "react";
import { Select } from "antd";
import styled from "styled-components";
import { getCodeOf } from "../../../../utils/utility";

const { Option } = Select;

const SelectImportExport = ({
  record,
  setStorages,
  storage,
  dataAutorite,
  autorite
}) => {
  const [errorPays, setErrorPays] = useState(false);
  return (
    <SelecImportStyled>
      {errorPays && (
        <p className="erreur">
          Le pays est déjà choisi ou il est déjà jugé non conforme.
        </p>
      )}
      <Select
        defaultValue={
          autorite === "AUTORITE"
            ? getCodeOf(record.autorite)
            : getCodeOf(record.pays)
        }
        showSearch={true}
        style={{ width: 150 }}
        onChange={e => {
          if (
            autorite === "AUTORITE"
              ? storage.findIndex(x => getCodeOf(x.autorite) === e) === -1
              : storage.findIndex(x => getCodeOf(x.pays) === e) === -1
          ) {
            setStorages(
              storage.map(item => {
                if (storage) {
                  storage
                    .filter(row => row.key === record.key)
                    .map(obj => {
                      return {
                        ...(obj.statut = "1"),
                        ...(obj.pays = autorite !== "AUTORITE" && e),
                        ...(obj.autorite = autorite === "AUTORITE" && e),
                        ...(obj.valid =
                          record.currentPays ===
                          getCodeOf(
                            autorite === "AUTORITE"
                              ? record.autorite
                              : record.pays
                          )
                            ? false
                            : true)
                      };
                    });
                }
                return {
                  ...item
                };
              })
            );
            setErrorPays(
              record.currentPays ===
                getCodeOf(
                  autorite === "AUTORITE" ? record.autorite : record.pays
                )
            );
          } else {
            setStorages(
              storage.map(item => {
                storage
                  .filter(row => row.key === record.key)
                  .map(obj => {
                    return {
                      ...(obj.statut = "1"),
                      ...(obj.pays = autorite !== "AUTORITE" && e),
                      ...(obj.autorite = autorite === "AUTORITE" && e),
                      ...(obj.valid = false)
                    };
                  });
                return {
                  ...item
                };
              })
            );
            setErrorPays(true);
          }
        }}
        disabled={String(record.statut) === "2" ? true : false}
      >
        {dataAutorite.map(dataBFF => {
          return <Option value={dataBFF.code}>{dataBFF.libelle}</Option>;
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
