import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/Checkbox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Datas";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(8);

  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

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
    // console.log(product);
    return (
      <Col lg={6} md={8} xs={24} key={product._id}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
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

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, caterory) => {
    const newFilters = { ...Filters };
    newFilters[caterory] = filters;

    if (caterory === "price") {
      let priceValues = handlePrice(filters);
      newFilters["price"] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    console.log(newSearchTerm);
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
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
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <Checkbox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFuction={updateSearchTerm} />
      </div>

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
