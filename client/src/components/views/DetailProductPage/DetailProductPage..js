import React, { useEffect } from "react";
import axios from "axios";

function DetailProductPage({ match }) {
  const { productId } = match.params;

  useEffect(() => {
    axios
      .get(`/api/product/product_by_id?id=${productId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
        } else {
          alert("상세 정보 가져오기를 실패했습니다.");
        }
      });
  }, []);
  return <div>DetailProductPage</div>;
}

export default DetailProductPage;
