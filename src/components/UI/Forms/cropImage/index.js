import React from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import CropImage from "./cropImage";

import "react-image-crop/dist/ReactCrop.css";

const index = ({
  src,
  visible,
  setVisible,
  setCroppedImageUrl,
  handleSaveCropFile,
  handleSaveOriginalFile
}) => {
  const handleOk = () => {
    setVisible(false);
    handleSaveCropFile();
  };

  const handleCancel = () => {
    setVisible(false);
    handleSaveOriginalFile();
  };

  return (
    <Modal
      title="Recadrage de l'image"
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
    >
      <CropImage src={src} setCroppedImageUrl={setCroppedImageUrl} />
    </Modal>
  );
};

export default withRouter(index);
