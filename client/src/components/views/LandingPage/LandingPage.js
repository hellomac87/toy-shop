import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res.data.productInfo);
        setProducts(res.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const renderCards = products.map((product, index) => {
    console.log(product);
    return (
      <Col lg={6} md={8} xs={24} key={product._id}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  return (
    <div
      style={{
        width: "75%",
        margin: "3rem auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      {/* Filter */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>

      <div style={{ justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
