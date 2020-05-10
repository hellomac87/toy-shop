import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

const FileUpload = ({ refreshFunction }) => {
  const [images, setImages] = useState([]);
  const dropHanlder = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post(`/api/product/image`, formData, config).then((res) => {
      if (res.data.success) {
        setImages([...images, res.data.filePath]);
        refreshFunction([...images, res.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const currnetIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currnetIndex, 1);

    setImages(newImages);
    refreshFunction(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHanlder}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img
              style={{ maxWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
