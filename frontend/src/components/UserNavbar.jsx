import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const UserNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">User Panel</div>
      <div className="nav-links">
        <Link to="/user-dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
