import React from "react";
import { Spin } from "antd";

export default ({ tip, size }) => {
  return (
    <Spin
      style={{
        marginLeft: "45%",
        marginRight: "40%",
        marginTop: "10%",
        marginBottom: "10%"
      }}
      tip={tip}
      size={size}
    />
  );
};
