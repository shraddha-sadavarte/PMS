import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/admin.css";

const AdminTasks = () => {
  const [projects, setProjects] = useState([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(true); // default to completed
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects(token, true); // isAdmin = true
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };
    fetchProjects();
  }, [token]);

  const isProjectCompleted = (project) => {
    const assigned = project.assignedTo || [];
    const progress = project.progress || [];
    return (
      assigned.length > 0 &&
      progress.length === assigned.length &&
      progress.every((p) => p.percent === 100)
    );
  };

  const filteredProjects = showCompletedOnly
    ? projects.filter(isProjectCompleted)
    : projects;

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <div className="admin-container">
          <div className="toggle-header">
            <h1 className="admin-title">
              {showCompletedOnly ? "✅ Completed Tasks" : "📋 All Tasks"}
            </h1>
            <button
              className="toggle-btn"
              onClick={() => setShowCompletedOnly((prev) => !prev)}
            >
              {showCompletedOnly ? "Show All Tasks" : "Show Only Completed"}
            </button>
          </div>

          <div className="project-grid">
            {filteredProjects.length === 0 ? (
              <p>No tasks to display.</p>
            ) : (
              filteredProjects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <h4>Progress by Users:</h4>
                  <ul>
                    {project.progress && project.progress.length > 0 ? (
                      project.progress.map((p) => (
                        <li key={p.user._id}>
                          {p.user.username}: {p.percent}%
                        </li>
                      ))
                    ) : (
                      <li>No progress recorded</li>
                    )}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTasks;
