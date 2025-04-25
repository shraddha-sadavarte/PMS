import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const AdminNavbar = () => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();  //  Clears ALL localStorage data
    navigate("/login", { replace: true });  //  Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="logo">Admin Panel</div>
      <div className="nav-links">
        <Link to="/dashboards">Dashboard</Link>
        <Link to="/admin-dashboard">Projects</Link>
        {/* <Link to="/projects">Projects</Link> */}
        <Link to="/users">Users</Link>
        <Link to="/admin-tasks">All Tasks</Link>
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
