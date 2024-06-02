import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import { UserProgressContext } from "../../store/userProgressContext";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseModal = () => {
    userProgressCtx.hideCheckout();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseModal}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name"></Input>
        <Input label="E-mail Address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>

        <p className="modal-actions">
          <Button onClick={handleCloseModal} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
