import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUsers(res.data));
    }
  }, []);

  return (
    <div className="users-page">
      <h2>All Users</h2>
      <div className="user-list">
        {users.length > 0 ? users.map(user => (
          <div className="user-item" key={user._id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <span>Role: {user.role}</span>
          </div>
        )) : <p>No users found.</p>}
      </div>
    </div>
  );
};

export default Users;
