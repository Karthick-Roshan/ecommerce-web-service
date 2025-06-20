import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Product not found or failed to load.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Transform backend product to match cart format
      const cartProduct = {
        id: product.productId,
        name: product.product_name,
        price: product.price,
        image: "https://via.placeholder.com/200", // Default image
        description: `Stock: ${product.quantity}`,
        vendorId: product.vendorId
      };
      
      addToCart(cartProduct);
      alert("Product added to cart!");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error: {error}</h2>
        <button onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <button 
        onClick={() => navigate('/products')}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ← Back to Products
      </button>
      
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1", minWidth: "300px" }}>
          <div style={{
            height: "300px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem"
          }}>
            <span style={{ color: "#666", fontSize: "1.2rem" }}>
              Product Image
            </span>
          </div>
        </div>
        
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {product.product_name}
          </h1>
          
          <p style={{ 
            fontSize: "1.5rem", 
            fontWeight: "bold", 
            color: "#2563eb",
            marginBottom: "1rem"
          }}>
            ₹{product.price}
          </p>
          
          <div style={{ marginBottom: "1rem" }}>
            <p><strong>Stock Available:</strong> {product.quantity} units</p>
            <p><strong>Product ID:</strong> {product.productId}</p>
          </div>
          
          {product.Vendor && (
            <div style={{ 
              backgroundColor: "#f9fafb", 
              padding: "1rem", 
              borderRadius: "8px",
              marginBottom: "1rem"
            }}>
              <h3>Vendor Information</h3>
              <p><strong>Seller:</strong> {product.Vendor.owner_name}</p>
              <p><strong>Email:</strong> {product.Vendor.email}</p>
              <p><strong>Phone:</strong> {product.Vendor.phone}</p>
            </div>
          )}
          
          <button 
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            style={{
              backgroundColor: product.quantity === 0 ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              cursor: product.quantity === 0 ? "not-allowed" : "pointer",
              fontSize: "1.1rem",
              width: "100%"
            }}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;