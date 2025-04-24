import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const UserNavbar = () => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();  //  Clears ALL localStorage data
    navigate("/login", { replace: true });  //  Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="logo">User Panel</div>
      <div className="nav-links">
        <Link to="/user-dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <button
          className="logout-button" onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
