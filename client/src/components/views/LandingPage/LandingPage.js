import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  }, []);
  return <div className="app"></div>;
}

export default LandingPage;
