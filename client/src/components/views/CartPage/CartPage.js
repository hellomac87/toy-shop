import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
function CartPage() {
  const { userData } = useSelector((state) => state.user);
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
    console.log(cartItem);
  }, [dispatch, userData]);
  return <div>CartPag11e</div>;
}

export default CartPage;
