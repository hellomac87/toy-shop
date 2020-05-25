import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

function ProductImage({ detail }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      let images = [];
      detail.images.map((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [detail]);
  // so tired...
  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default ProductImage;
