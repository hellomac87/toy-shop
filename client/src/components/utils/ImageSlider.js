import React from "react";
import { Carousel } from "antd";

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <img
            style={{ width: "100%", height: "140px" }}
            src={`http://localhost:5000/${image}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
