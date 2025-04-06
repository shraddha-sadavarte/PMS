import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./components/projects/Projects";
import Tasks from "./components/tasks/Tasks";
import Users from "./pages/Users";

const isAuthenticated = () => !!localStorage.getItem("token");
const userRole = () => localStorage.getItem("role");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route path="/user-dashboard" element={isAuthenticated() && userRole() === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={isAuthenticated() && userRole() === "user" ? <Tasks /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={isAuthenticated() && userRole() === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/projects" element={isAuthenticated() && userRole() === "admin" ? <Projects /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated() && userRole() === "admin" ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
