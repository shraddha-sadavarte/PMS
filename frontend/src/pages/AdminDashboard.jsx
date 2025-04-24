import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProjectById,
} from "../api/projectApi";
import { getUsers } from "../api/userApi";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/admin.css";
import { toast } from "react-toastify"; // ✅ Import toast

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all projects and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await getProjects(token, true);
        setProjects(projectRes.data);

        const userRes = await getUsers(token);
        setUsers(userRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load users or projects.");
      }
    };

    fetchData();
  }, [token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "assignedTo") {
      const selectedUsers = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setFormData((prev) => ({ ...prev, [name]: selectedUsers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle create or update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && editingProjectId) {
        await updateProjectById(editingProjectId, formData, token);
        toast.success("Project updated successfully ✅");
      } else {
        await createProject(formData, token);
        toast.success("Project created successfully ✅");
      }

      // Reset form and reload
      setFormData({ name: "", description: "", deadline: "", assignedTo: [] });
      setEditMode(false);
      setEditingProjectId(null);

      const updated = await getProjects(token, true);
      setProjects(updated.data);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit project. Try again.");
    }
  };

  // Edit button click: populate form with existing data
  const handleEditClick = (project) => {
    setEditMode(true);
    setEditingProjectId(project._id);

    const assignedToArray = Array.isArray(project.assignedTo)
      ? project.assignedTo
      : [project.assignedTo];

    setFormData({
      name: project.name || "",
      description: project.description || "",
      deadline: project.deadline ? project.deadline.slice(0, 10) : "",
      assignedTo: assignedToArray.map((u) => u._id || u),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>

          {/* ===== Project Form ===== */}
          <form className="project-form" onSubmit={handleSubmit}>
            <h3>{editMode ? "Edit Project" : "Create New Project"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
            <select
              name="assignedTo"
              multiple
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <button type="submit">
              {editMode ? "Update Project" : "Create Project"}
            </button>
          </form>

          {/* ===== All Projects Display ===== */}
          <h2 className="subheading">All Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
                <h4>Progress:</h4>
                <ul>
                  {project.progress?.length > 0 ? (
                    project.progress.map((p) => (
                      <li key={p.user._id}>
                        {p.user.username}: {p.percent}%
                      </li>
                    ))
                  ) : (
                    <li>No progress yet</li>
                  )}
                </ul>
                <button className="edit-btn" onClick={() => handleEditClick(project)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
