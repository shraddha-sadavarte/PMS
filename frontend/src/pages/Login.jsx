import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { accessToken: token, role } = res.data;

      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success("Login successful");

        setTimeout(() => {
          setFormData({ email: "", password: "" });
          navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard", { replace: true });
        }, 300);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
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
