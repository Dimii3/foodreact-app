import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import { UserProgressContext } from "../../store/userProgressContext";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";

const reqConf = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, loading, sendReq, error, clearData } = useHttp(
    "http://localhost:3000/orders",
    reqConf
  );

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    clearCart();
    clearData();
  };

  const handleCloseModal = () => {
    userProgressCtx.hideCheckout();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    sendReq(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button onClick={handleCloseModal} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (loading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="E-mail Address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        {error && <Error title={"Failed to submit order"} msg={error}></Error>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
