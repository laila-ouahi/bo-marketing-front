import React from "react";
import { Radio } from "antd";

export default ({ onChange, error, value, items }) => {
  return (
    <div>
      <Radio.Group
        onChange={onChange}
        value={value}
        style={{ marginBottom: "20px" }}
      >
        {items.map((item, index) => (
          <Radio key={index} value={item.path}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
      {error && <div className="errors">{error}</div>}
    </div>
  );
};
