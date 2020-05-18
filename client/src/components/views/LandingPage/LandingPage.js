import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/Checkbox";
import { continents } from "./Sections/Datas";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(8);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    let body = {
      skip,
      limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post(`/api/product/products`, body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let newSkip = skip + limit;

    let body = {
      skip: newSkip,
      limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(newSkip);
  };

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

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit,
      filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filters, caterory) => {
    const newFilters = { ...Filters };
    newFilters[caterory] = filters;

    showFilteredResults(newFilters);
  };

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
      {/* CheckBox */}
      <Checkbox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, "continents")}
      />
      {/* RadioBox */}

      {/* Search */}
      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {postSize >= limit && (
        <div style={{ justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
