const API_BASE_URL = 'http://localhost:3000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Product API calls
export const productAPI = {
  // Get all products
  getAllProducts: () => apiCall('/products'),
  
  // Get single product by ID
  getProductById: (id) => apiCall(`/products/${id}`),
  
  // Create new product
  createProduct: (productData) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  // Update product
  updateProduct: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  // Delete product
  deleteProduct: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Vendor API calls
export const vendorAPI = {
  // Get all vendors
  getAllVendors: () => apiCall('/vendors'),
  
  // Create vendor
  createVendor: (vendorData) => apiCall('/vendors', {
    method: 'POST',
    body: JSON.stringify(vendorData),
  }),
  
  // Create vendor with products
  createVendorWithProducts: (data) => apiCall('/vendor-product', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default { productAPI, vendorAPI };