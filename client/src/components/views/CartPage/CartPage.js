import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
function CartPage() {
  const [total, setTotal] = useState(0);
  const { userData, cartDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // nope
  useEffect(() => {
    let cartItem = [];
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach((item) => {
          cartItem.push(item.id);
        });

        dispatch(getCartItems(cartItem, userData.cart)).then((response) => {
          calculateTotal(response.payload);
        });
      }
    }
  }, [dispatch, userData]);

  const calculateTotal = (cartDetail) => {
    let result = 0;

    cartDetail.map((item) => {
      result += parseInt(item.price) * item.quantity;
    });

    setTotal(result);
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My cart</h1>
      <div>
        <UserCardBlock products={cartDetail} />
      </div>

      <div style={{ marginTop: "3rem" }}>
        <div>Total Price : {total}</div>
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* nolja */}
        {/* need something fun developing */}
        {/* typescript go */}
        {/* typescript go */}
        {/* typescript go */}
      </div>
    </div>
  );
}

export default CartPage;
