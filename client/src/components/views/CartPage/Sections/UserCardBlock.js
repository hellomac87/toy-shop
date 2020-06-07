import React from "react";
import "./UserCardBlock.css";
const UserCardBlock = ({ products }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };
  // tired 2
  // rest day

  const renderItems = () => {
    return (
      products &&
      products.map((product) => {
        return (
          <tr key={product._id}>
            <td>
              <img
                style={{ width: "70px" }}
                alt="product"
                src={renderCartImage(product.images)}
              />
            </td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <button>remove</button>
            </td>
          </tr>
        );
      })
    );
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart </th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default UserCardBlock;
