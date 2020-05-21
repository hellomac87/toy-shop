import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature({ refreshFuction }) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    refreshFuction(e.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="search"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
