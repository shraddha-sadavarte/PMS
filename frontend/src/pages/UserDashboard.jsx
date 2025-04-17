import { useEffect, useState } from "react";
import { getProjects, updateProjectProgress } from "../api/projectApi";
import UserNavbar from "../components/UserNavbar";
import "../styles/user.css";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects(token);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching user projects:", err);
      }
    };
    fetchProjects();
  }, [token]);

  const handleProgressChange = async (projectId, newProgress) => {
    try {
      await updateProjectProgress(projectId, newProgress, token);
      const updated = await getProjects(token);
      setProjects(updated.data);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="user-page">
        <div className="user-container">
          <h1 className="user-title">Your Dashboard</h1>
          <h2 className="subheading">Assigned Projects</h2>
          <div className="task-grid">
            {projects.map((project) => {
              const myProgress = project.progress.find(p => p.user._id === project.loggedInUserId); // You can attach this backend
              return (
                <div key={project._id} className="task-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                  <p><strong>My Progress:</strong> {myProgress?.percent ?? 0}%</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={myProgress?.percent ?? 0}
                    onChange={(e) => handleProgressChange(project._id, Number(e.target.value))}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
