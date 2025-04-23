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

    console.log("Frontend: Form Data submitted:", formData);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Frontend: API Response:", res.data);
      const token = res.data.accessToken;
      const role = res.data.role;
      console.log("Frontend: Token received:", token);
      console.log("Frontend: Role received:", role);

      if (token && role) {
        console.log("Frontend: Token and role are valid.");
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        console.log("Frontend: Token and role stored in localStorage.");
        setFormData({ email: "", password: "" });
        console.log("Frontend: Form data reset.");

        if (role === "admin") {
          console.log("Frontend: Navigating to /admin-dashboard");
          navigate("/admin-dashboard", { replace: true });
          console.log("Frontend: Navigation to /admin-dashboard complete.");
        } else {
          console.log("Frontend: Navigating to /user-dashboard");
          navigate("/user-dashboard", { replace: true });
          console.log("Frontend: Navigation to /user-dashboard complete.");
        }
      } else {
        setError("Frontend: Invalid response from server (missing token or role).");
        console.log("Frontend: Invalid response from server.");
      }
    } catch (err) {
      console.error("Frontend: Login Error:", err);
      setError(err.response?.data?.message || "Frontend: Login failed");
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