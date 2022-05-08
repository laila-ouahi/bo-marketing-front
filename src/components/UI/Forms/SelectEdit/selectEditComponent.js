import React from "react";
import { Select } from "antd";
import { getCodeOf, isValidFiled } from "../../../../utils/utility";
import { Messages } from "../../../../constants/resources/Global";

export default ({
  onChange,
  items,
  error,
  value,
  name,
  showSearch,
  onBlur,
  disabled,
  loading
}) => {
  return (
    <Select
      loading={loading}
      onBlur={onBlur}
      name={name}
      value={getCodeOf(value) || ""}
      onChange={onChange}
      showSearch={showSearch}
      id={error}
      disabled={disabled}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props &&
        isValidFiled(option.props.children) &&
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      key={name}
    >
      {items && (
        <Select.Option key="0" value={undefined}>
          {Messages.emptySelectOptionName}
        </Select.Option>
      )}
      {items &&
        items.map((item, index) => (
          <Select.Option key={index + 1} value={`${item.code}`}>
            {item.libelle}
          </Select.Option>
        ))}
    </Select>
  );
};
