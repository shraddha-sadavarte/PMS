// src/pages/UserTasks.jsx
import { useEffect, useState } from "react";
import { getProjects, updateProjectProgress } from "../api/projectApi";
import UserNavbar from "../components/UserNavbar";
import "../styles/usertasks.css"; // Create this for styling

const UserTasks = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await getProjects(token);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load user tasks", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProgressChange = async (projectId, percent) => {
    try {
      await updateProjectProgress(projectId, percent, token);
      fetchProjects(); // refresh
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="user-tasks-page">
        <h2>Your Assigned Tasks</h2>
        {projects.map((project) => {
          const userProgress = project.progress.find((p) => p.user._id || p.user === project.userId);

          return (
            <div key={project._id} className="user-task-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
              </p>
              <label>Update Progress:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={userProgress?.percent || 0}
                onChange={(e) => handleProgressChange(project._id, e.target.value)}
              />
              <span>% complete</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserTasks;
