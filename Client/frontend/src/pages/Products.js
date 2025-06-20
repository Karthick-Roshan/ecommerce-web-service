import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>Error: {error}</h2>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div
              key={product.productId}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ 
                height: "150px", 
                backgroundColor: "#f0f0f0", 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px"
              }}>
                <span style={{ color: "#666" }}>Product Image</span>
              </div>
              <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
                {product.product_name}
              </h3>
              <p style={{ 
                fontSize: "1.2rem", 
                fontWeight: "bold", 
                color: "#2563eb",
                margin: "0.5rem 0"
              }}>
                ₹{product.price}
              </p>
              <p style={{ 
                fontSize: "0.9rem", 
                color: "#666",
                margin: "0.5rem 0"
              }}>
                Stock: {product.quantity}
              </p>
              {product.Vendor && (
                <p style={{ 
                  fontSize: "0.8rem", 
                  color: "#888",
                  margin: "0.5rem 0"
                }}>
                  Sold by: {product.Vendor.owner_name}
                </p>
              )}
              <Link to={`/products/${product.productId}`}>
                <button style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "0.5rem"
                }}>
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;