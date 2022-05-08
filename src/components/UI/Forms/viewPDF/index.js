import { Icon } from "antd";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CropImage from "../cropImage";
import { withRouter } from "react-router-dom";

import { showMessage } from "../../../../utils/utilites/notificationUtilities";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const samplePDF =
  "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

const PdfViewer = () => {
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [src, setSrc] = useState(samplePDF);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(null);
  const [array, setArray] = useState([]);

  const [target, setTarget] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  useEffect(() => {
    page && getImgURL(page);
  }, [page]);

  const onDocumentLoadSuccess = document => {
    let numeroPage =
      document && document._pdfInfo && document._pdfInfo.numPages;
    setArray([]);
    for (let i = 0; i < numeroPage; i++) {
      document &&
        document.getPage(i + 1).then(res => {
          setArray([...array, res]);
        });
    }
    document &&
      document.getPage(numeroPage).then(res => {
        setPage(res);
      });

    setNumPages(numeroPage);
  };

  const getImagePage = pdfPage => {
    if (pdfPage) {
      new Promise((resolve, reject) => {
        const scale = "1.5";
        const viewport = page.getViewport({
          scale: scale
        });
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.height = viewport.height || viewport.viewBox[3];
        canvas.width = viewport.width || viewport.viewBox[2];
        return page
          .render({
            canvasContext,
            viewport
          })
          .promise.then(res => {
            setSrc(canvas.toDataURL());
            return resolve(canvas.toDataURL());
          });
      });
    }
  };

  const getImgURL = async pdfPage => {
    pdfPage && (await getImagePage(pdfPage));
  };

  const staticImageInput = editedItem => (
    <input
      accept=".pdf"
      className={editedItem && editedItem.code}
      style={{ display: "none" }}
      type="file"
      onChange={e => {
        setFile(e && e.target && e.target.files && e.target.files[0]);
        setSrc(
          e.target &&
            e.target.files &&
            e.target.files[0] &&
            URL.createObjectURL(e.target.files[0])
        );
      }}
    />
  );

  const getStaticImage = () => (
    <label>
      <form className="uploaD">
        Cliquer pour ajouter un PDF :{" "}
        <Icon type="upload" style={{ fontSize: "30px", color: "#008991" }} />
        {staticImageInput()}
      </form>
    </label>
  );

  const handleResetData = () => {
    setTarget(null);
    setItemToEdit(null);
    setSrc(null);
    setCroppedImageUrl(null);
  };

  const handleSaveOriginalFile = () => {
    //uploadStaticFile(target, src, itemToEdit && itemToEdit.code);
    handleResetData();
  };

  const handleSaveCropFile = () => {
    uploadStaticFile(target, croppedImageUrl, itemToEdit && itemToEdit.code);
    handleResetData();
  };

  const uploadStaticFile = (fil, url, code) => {
    if (fil) {
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
      /* fetch(url)
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
                }); */
    }
  };

  return (
    <div>
      {getStaticImage()}
      <CropImage src={src} setCroppedImageUrl={setCroppedImageUrl} />
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={error => showMessage("error", error)}
      >
        <br />

        {Array.from(new Array(numPages), (el, index) => {
          return (
            <span style={{ width: "100px" }}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                onRenderSuccess={pages => {
                  pages && pages._pageIndex === 0 && setPage(pages);
                }}
                onClick={(document, pages) => {
                  setPage(pages);
                }}
              />
              <br />
            </span>
          );
        })}
      </Document>
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

export default withRouter(PdfViewer);
