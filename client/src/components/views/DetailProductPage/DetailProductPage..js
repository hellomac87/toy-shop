import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";

function DetailProductPage({ match }) {
  const { productId } = match.params;

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/product_by_id?id=${productId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setProduct(res.data.product[0]);
        } else {
          alert("상세 정보 가져오기를 실패했습니다.");
        }
      });
  }, []);

  return (
    <div style={{ width: "100", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* Product Image */}
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* Product Info */}
          <ProductInfo detail={product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
