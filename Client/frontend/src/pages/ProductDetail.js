import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="300" />
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
