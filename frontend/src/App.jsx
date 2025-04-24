import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./components/projects/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import AdminTasks from "./pages/AdminTasks";
import ToastNotification from "./components/ToastNotification";
import { useState, useEffect } from "react";

const isAuthenticated = () => !!localStorage.getItem("token");
const userRole = () => localStorage.getItem("role");

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Sync token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  return (
    <Router>
      <ToastNotification />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={isAuthenticated() && userRole() === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={isAuthenticated() && userRole() === "user" ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={isAuthenticated() && userRole() === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/projects" element={isAuthenticated() && userRole() === "admin" ? <Projects /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated() && userRole() === "admin" ? <Users /> : <Navigate to="/login" />} />
        <Route path="/admin-tasks" element={<AdminTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
