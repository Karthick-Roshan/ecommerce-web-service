import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "2rem" }}>Your cart is empty.</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={item.image} alt={item.name} width="100" />
          <div>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ₹{item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>
              Remove from Cart
            </button>
          </div>
        </div>
      ))}
      <h3>Grand Total: ₹{getTotal()}</h3>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
