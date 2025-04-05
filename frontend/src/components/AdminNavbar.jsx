import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">Admin Panel</div>
      <ul className="admin-navbar-links">
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
