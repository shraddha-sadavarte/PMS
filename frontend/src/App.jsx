import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const isAuthenticated = () => !!localStorage.getItem("token");
const userRole = () => localStorage.getItem("role");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated() && userRole() === "user" ? (
            <UserDashboard />
           ) : (
          <Navigate to="/login" />
          )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated() && userRole() === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
