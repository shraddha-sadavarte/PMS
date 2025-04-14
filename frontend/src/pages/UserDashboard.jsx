import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
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

  return (
    <>
      <UserNavbar />
      <div className="user-page">
        <div className="user-container">
          <h1 className="user-title">Welcome to Your Dashboard!</h1>
          <h2 className="subheading">Your Assigned Projects</h2>
          <div className="task-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="task-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No projects assigned.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
