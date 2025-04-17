import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/projectApi";
import { getUsers } from "../api/userApi";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await getProjects(token);
        setProjects(projectRes.data);
        const userRes = await getUsers(token);
        console.log("Fetched users: ",userRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
  
    if (name === "assignedTo") {
      const selectedOptions = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
  
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions, // array of selected user IDs
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData, token);
      alert("Project created successfully!");
      setFormData({ name: "", description: "", deadline: "", assignedTo: [] });
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
            
            <select name="assignedTo" multiple value={formData.assignedTo} onChange={handleChange} required>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.username}</option>
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
                <h4>Progress:</h4>
                <ul>
                  {project.progress && project.progress.length > 0 ? (
                  project.progress.map((p) => (
                  <li key={p.user._id}>
                    {p.user.username}: {p.percent}%
                  </li>
                  ))
                ) : (
                 <li>No progress available</li>
                 )}
                </ul>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
