import React from "react";
import { Modal } from "antd";

export default ({
  title,
  visible,
  onOk,
  onCancel,
  okText,
  cancelText,
  text
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      okText={okText ? okText : "OK"}
      
    >
      <p>{text}</p>
    </Modal>
  );
};
