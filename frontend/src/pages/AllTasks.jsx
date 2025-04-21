// src/pages/AllTasks.jsx
import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/alltasks.css"; // Create this for styling

const AllTasks = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjects(token, true); // isAdmin = true
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="all-tasks-page">
        <h2>All Projects & Assigned User Progress</h2>
        {projects.map((project) => (
          <div className="task-card" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p><strong>Assigned Users:</strong></p>
            <ul>
              {project.progress.map((entry) => (
                <li key={entry.user._id}>
                  {entry.user.username}: {entry.percent}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTasks;
