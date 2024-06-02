import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/userProgressContext.jsx";
import Modal from "./UI/Modal.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);
  const { items, addItem, removeItem } = useContext(CartContext);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  };

  const handleGoToCheckout = () => {
    userProgressCtx.showCheckout();
  };
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onDecrease={() => {
              removeItem(item.id);
            }}
            onIncrease={() => {
              addItem(item);
            }}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
