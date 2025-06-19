import { useState } from "react";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onLogin(); // Simulated login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
        )}

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 ml-1 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;
