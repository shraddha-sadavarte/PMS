import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/admin.css";

const AdminTasks = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects(token, true);
        const completedOnly = res.data.filter((project) => {
          const assigned = project.assignedTo || [];
          const progress = project.progress || [];
          return (
            assigned.length > 0 &&
            progress.length === assigned.length &&
            progress.every((p) => p.percent === 100)
          );
        });
        setProjects(completedOnly);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };
    fetchProjects();
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <div className="admin-container">
          <h1 className="admin-title">✅ Completed Tasks</h1>
          <div className="project-grid">
            {projects.length === 0 ? (
              <p>No completed projects yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <h4>User Progress:</h4>
                  <ul>
                    {project.progress.map((p) => (
                      <li key={p.user._id}>
                        {p.user.username}: {p.percent}%
                      </li>
                    ))}
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
