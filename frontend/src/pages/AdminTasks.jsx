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
        const res = await getProjects(token, true); // true => admin
        setProjects(res.data);
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
          <h1 className="admin-title">All Tasks (Admin View)</h1>
          <div className="project-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
                <h4>Progress by Users:</h4>
                <ul>
                  {project.progress?.length ? (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTasks;
