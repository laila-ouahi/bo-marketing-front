import React, { useEffect, useState } from "react";
import { Icon, Modal, Pagination } from "antd";
import CropImage from "../cropImage/cropImage";
import { Document, Page, pdfjs } from "react-pdf";
import Spin from "../Spin";
import styled from "styled-components";
import { showMessage } from "../../../../utils/utilites/notificationUtilities";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ImageInput = ({
  value,
  disabled,
  handleChangeFileList,
  onEdit,
  index,
  setIndex
}) => {
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState(null);
  const [visible, setVisible] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);
  const [totalPagesNumber, setTotalPagesNumber] = useState(0);

  const [array, setArray] = useState([]);
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(array.find(item => item._pageIndex === pageNumber));
  }, [array, pageNumber]);

  useEffect(() => {
    page && getImgURL(page);
  }, [page]);

  const staticImageInput = editedItem => (
    <input
      accept=".pdf"
      className={editedItem && editedItem.code}
      style={{ display: "none" }}
      type="file"
      onChange={e => {
        onEdit(editedItem, e);
        setTarget(e && e.target && e.target.files && e.target.files[0]);
        setVisible(true);
        setPageNumber(0);
        setTotalPagesNumber(0);
        setPage(null);
        setSrc(null);
        setLoading(true);
        setArray([]);
      }}
    />
  );

  const getStaticImage = () => (
    <label>
      <form>
        Cliquer pour ajouter un PDF :
        <Icon type="upload" style={{ fontSize: "30px", color: "#008991" }} />
        {staticImageInput()}
      </form>
    </label>
  );

  const onDocumentLoadSuccess = doc => {
    let numeroPage = doc && doc._pdfInfo && doc._pdfInfo.numPages;
    doc && handleSpliteDocToPages(doc, 0);
    setTotalPagesNumber(numeroPage);
    setPageNumber(0);
  };

  const handleSpliteDocToPages = (doc, i, liste) => {
    if (doc) {
      let numeroPage = doc._pdfInfo && doc._pdfInfo.numPages;
      if (i < numeroPage) {
        if (liste) {
          doc
            .getPage(i + 1)
            .then(res => {
              handleSpliteDocToPages(doc, i + 1, [...liste, res]);
            })
            .catch(error => showMessage("error", error && error.message));
        } else {
          doc
            .getPage(i + 1)
            .then(res => {
              handleSpliteDocToPages(doc, i + 1, [res]);
            })
            .catch(error => showMessage("error", error && error.message));
        }
      } else {
        setArray(liste || []);
        setTotalPagesNumber(liste ? liste.length : 0);
      }
    } else {
      setArray([]);
    }
  };

  const uploadStaticFile = (doc, url) => {
    if (doc) {
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
        })
        .catch(error => showMessage("error", error && error.message));
    }
  };

  const handleResetData = () => {
    setVisible(false);
    setTarget(null);
    setCroppedImageUrl(null);
    setPageNumber(0);
    setTotalPagesNumber(0);
    setPage(null);
    setSrc(null);
    setLoading(false);
    setArray([]);
  };

  const getImgURL = async pdfPage => {
    pdfPage && (await getImagePage(pdfPage));
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
          .promise.then(() => {
            setSrc(canvas.toDataURL());
            setLoading(false);
            return resolve(canvas.toDataURL());
          })
          .catch(error => showMessage("error", error && error.message));
      });
    }
  };

  const handleOk = () => {
    setLoading(true);
    if (target && croppedImageUrl) {
      setVisible(false);
      uploadStaticFile(target, croppedImageUrl);
      handleResetData();
    } else {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLoading(true);
    handleResetData();
  };

  const handleSetPageNumber = p => {
    setPageNumber(p && p - 1 ? p - 1 : 0);
    setSrc(null);
    setLoading(true);
  };

  return (
    <PDFInputStyle>
      {!disabled && getStaticImage()}
      <Modal
        title=" Selectionner la page"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        loading={loading}
      >
        {loading ? (
          <Spin />
        ) : (
          <div>
            {src && (
              <div>
                <CropImage src={src} setCroppedImageUrl={setCroppedImageUrl} />
                <PDFInputStyle>
                  <Pagination
                    showQuickJumper
                    onChange={handleSetPageNumber}
                    pageSize={1}
                    current={pageNumber + 1}
                    total={totalPagesNumber}
                  />
                </PDFInputStyle>
              </div>
            )}
          </div>
        )}
        <br />

        <div className={"pagzz"} style={{ display: "none" }}>
          <Document
            width={50}
            file={target}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={error => showMessage("error", error)}
          >
            {Array.from(new Array(totalPagesNumber), (el, i) => {
              return (
                <div className={"pagess"}>
                  <Page
                    width={50}
                    key={`page_${i + 1}`}
                    pageNumber={i + 1}
                    onRenderSuccess={pages => {
                      pages && pages._pageIndex === 0 && setPage(pages);
                    }}
                    onClick={(document, pages) => {
                      pages &&
                        (pages._pageIndex || pages._pageIndex === 0) &&
                        setPage(pages);
                    }}
                  />
                </div>
              );
            })}
          </Document>
        </div>
      </Modal>
    </PDFInputStyle>
  );
};
export default ImageInput;

const PDFInputStyle = styled.div`
  .ant-pagination {
    display: flex;
    justify-content: center;
    font-size: smaller;
  }
`;
