// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { accessToken: token, role } = res.data;

      if (token && role) {
        // Store token and role
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Optional short delay to ensure state/localStorage updates are settled
        setTimeout(() => {
          setFormData({ email: "", password: "" });

          // Navigate based on role
          if (role === "admin") {
            navigate("/admin-dashboard", { replace: true });
          } else {
            navigate("/user-dashboard", { replace: true });
          }
        }, 100); // 100ms delay helps in some edge cases
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="switch-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
