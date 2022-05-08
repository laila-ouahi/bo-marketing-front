import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropImage = ({ src, setCroppedImageUrl }) => {
  const canvas = useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imageRef, setImageRef] = useState(null);

  const onCropComplete = cropItem => {
    makeClientCrop(cropItem);
  };

  const makeClientCrop = async cropItem => {
    if (imageRef && cropItem.width && cropItem.height) {
      await getCroppedImg(imageRef, cropItem, "newFile.jpeg");
    }
  };

  const getCroppedImg = (image, cropItem, fileName) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const scaleWidth = cropItem.width * scaleX;
    const scaleHeight = cropItem.height * scaleY;

    canvas.current.width = scaleWidth;
    canvas.current.height = scaleHeight;
    const ctx = canvas.current.getContext("2d");
    ctx.drawImage(
      image,
      cropItem.x * scaleX,
      cropItem.y * scaleY,
      scaleWidth,
      scaleHeight,
      0,
      0,
      scaleWidth,
      scaleHeight
    );

    new Promise((resolve, reject) => {
      canvas &&
        canvas.current.toBlob(
          blob => {
            if (!blob) {
              return;
            }
            blob.name = fileName;
            let fileUrl = (window.webkitURL || window.URL).createObjectURL(
              blob
            );
            setCroppedImageUrl(fileUrl);
            resolve(fileUrl);
          },
          "image/jpeg",
          "-moz-parse-options:format=bmp;bpp=32"
        );
    });
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={setImageRef}
            onComplete={onCropComplete}
            onChange={setCrop}
          />
        )}
      </div>
      <canvas ref={canvas} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default withRouter(CropImage);
