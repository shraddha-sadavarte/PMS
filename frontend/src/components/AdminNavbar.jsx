import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Admin Panel</div>
      <div className="nav-links">
        <Link to="/admin-dashboard">Dashboard</Link>
        {/* <Link to="/projects">Projects</Link> */}
        <Link to="/users">Users</Link>
        <Link to="/admin-tasks">All Tasks</Link>
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

export default AdminNavbar;
