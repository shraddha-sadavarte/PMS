import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loginAttempt, setLoginAttempt] = useState(0); //  Track login attempts

  useEffect(() => {
      //  Reset state when component mounts or on login attempt
      setFormData({ email: "", password: "" });
      setLoggedIn(false);
      setUserRole(null);
      setLoginAttempt(prevAttempt => prevAttempt + 1);
  }, []);  //  Empty dependency array: runs only on mount

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
  
        // ❗️Force reload to trigger App.jsx useEffect and re-check token
        window.location.href = role === "admin" ? "/admin-dashboard" : "/user-dashboard";
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  

  useEffect(() => {
      if (loggedIn && userRole) {
          navigate(userRole === "admin" ? "/admin-dashboard" : "/user-dashboard", { replace: true });
      }
  }, [loggedIn, userRole, navigate]);

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