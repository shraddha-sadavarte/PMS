import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/projectApi";
import { getUsers } from "../api/userApi"; // Create this API
import AdminNavbar from "../components/AdminNavbar";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await getProjects(token);
        setProjects(projectRes.data);
        const userRes = await getUsers(token);
        setUsers(userRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData, token);
      alert("Project created successfully!");
      setFormData({ name: "", description: "", deadline: "", assignedTo: "" });
      const updated = await getProjects(token);
      setProjects(updated.data);
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>

          <form className="project-form" onSubmit={handleSubmit}>
            <h3>Create New Project</h3>
            <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
              <option value="">Assign to User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
            <button type="submit">Create Project</button>
          </form>

          <h2 className="subheading">All Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
