import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Project Management</h1>
      {token && (
        <div>
          <span className="mr-4">{role === "admin" ? "Admin" : "User"} Dashboard</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
