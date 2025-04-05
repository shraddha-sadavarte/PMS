import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const UserNavbar = () => {
  return (
    <nav className="user-navbar">
      <div className="user-navbar-brand">User Panel</div>
      <ul className="user-navbar-links">
        <li><Link to="/user-dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
