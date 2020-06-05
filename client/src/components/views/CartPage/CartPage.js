import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
function CartPage() {
  const { userData, cartDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItem = [];
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach((item) => {
          cartItem.push(item.id);
        });

        dispatch(getCartItems(cartItem, userData.cart));
      }
    }
  }, [dispatch, userData]);
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My cart</h1>
      <div>
        <UserCardBlock products={cartDetail && cartDetail.product} />
      </div>
    </div>
  );
}

export default CartPage;
