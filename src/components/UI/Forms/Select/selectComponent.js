import React, { useEffect } from "react";
import { Select, Tooltip } from "antd";
import { isValidFiled, getCodeOf } from "../../../../utils/utility";
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
  loading,
  hideListTooltip
}) => {
  useEffect(() => {
    if (isValidFiled(items) && value) {
      const equivalentInListe =
        items &&
        items.find(item => String(item.code) === String(getCodeOf(value)));
      if (!equivalentInListe) {
        onChange(null);
      } else if (equivalentInListe && !value.libelle) {
        onChange(equivalentInListe, true);
      }
    }
  }, [value, items]);

  const handleChange = SelectedItem => {
    let Value =
      items && items.find(item => String(item.code) === String(SelectedItem));
    onChange(Value);
  };

  return (
    <Select
      loading={loading}
      onBlur={onBlur}
      name={name}
      value={value && getCodeOf(value)}
      onChange={handleChange}
      showSearch={showSearch}
      id={error}
      disabled={disabled}
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
    >
      {items && (
        <Select.Option key="0" value={undefined}>
          <span>{Messages.emptySelectOptionName}</span>
        </Select.Option>
      )}
      {items &&
        items.map((item, index) => (
          <Select.Option key={index + 1} value={getCodeOf(item)}>
            {hideListTooltip ? (
              <span>{item.libelle}</span>
            ) : (
              <Tooltip title={item.libelle}>{item.libelle}</Tooltip>
            )}
          </Select.Option>
        ))}
    </Select>
  );
};
