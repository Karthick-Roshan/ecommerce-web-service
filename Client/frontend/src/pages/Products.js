import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

const Products = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <Link to={`/products/${product.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
