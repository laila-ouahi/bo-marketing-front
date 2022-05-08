import React, { useState } from "react";
import { Icon } from "antd";
import CropImage from "../cropImage";

const ImageInput = ({
  value,
  disabled,
  handleChangeFileList,
  onEdit,
  index,
  setIndex
}) => {
  const [target, setTarget] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [src, setSrc] = useState(null);
  const [visible, setVisible] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  //
  const handleResetData = () => {
    setTarget(null);
    setItemToEdit(null);
    setSrc(null);
    setCroppedImageUrl(null);
  };
  //
  const handleSaveCropFile = () => {
    uploadStaticFile(target, croppedImageUrl, itemToEdit && itemToEdit.code);
    handleResetData();
  };
  //
  const handleSaveOriginalFile = () => {
    //uploadStaticFile(target, src, itemToEdit && itemToEdit.code);
    handleResetData();
  };

  //
  const uploadStaticFile = (file, url, code) => {
    if (file) {
      /*if (value && value.find(item => item.code === code)) {
        Object.keys(value).map(key => {
          if (value[key].code === code) {
            let newarray = [...value];
            newarray[key].edit = true;
            newarray[key].src = URL.createObjectURL(file);
            newarray[key].file = file;
            newarray[key].filetype = file.type;
            newarray[key].filevalider = false;
            newarray[key].error = false;
            handleChangeFileList(newarray);
            document.getElementsByClassName(code)[0].value = "";
          }
          return value;
        });
      } else {*/

      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          let newObject = {
            code: index + 1,
            reference: null,
            src: url,
            file: blob
          };
          setIndex(index + 1);
          handleChangeFileList([...value, newObject]);
        });
    }
  };
  //
  const staticImageInput = editedItem => (
    <input
      accept=".png, .jpg, .jpeg , .pdf"
      className={editedItem && editedItem.code}
      style={{ display: "none" }}
      type="file"
      onChange={e => {
        onEdit(editedItem, e);
        setTarget(e && e.target && e.target.files && e.target.files[0]);
        setItemToEdit(editedItem);
        setSrc(
          e.target &&
            e.target.files &&
            e.target.files[0] &&
            URL.createObjectURL(e.target.files[0])
        );
        setVisible(true);
      }}
    />
  );

  //
  const getStaticImage = () => (
    <label>
      <form>
        Cliquer pour ajouter une image :
        <Icon type="upload" style={{ fontSize: "30px", color: "#008991" }} />
        {staticImageInput()}
      </form>
    </label>
  );

  return (
    <div>
      {!disabled && getStaticImage()}

      <CropImage
        src={src}
        visible={visible}
        setVisible={setVisible}
        setCroppedImageUrl={setCroppedImageUrl}
        handleSaveCropFile={handleSaveCropFile}
        handleSaveOriginalFile={handleSaveOriginalFile}
      />
    </div>
  );
};
export default ImageInput;
