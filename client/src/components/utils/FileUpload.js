import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

const FileUpload = () => {
  const dropHanlder = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post(`/api/product/image`, formData, config).then((res) => {
      console.log(res);
      if (res.data.success) {
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
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
    </div>
  );
};

export default FileUpload;