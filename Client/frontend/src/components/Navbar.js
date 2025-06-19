import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">MyShop</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart 🛒</Link>
      </div>
    </nav>
  );
}

export default Navbar;
