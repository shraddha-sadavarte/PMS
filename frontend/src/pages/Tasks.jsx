import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "../components/UserNavbar";
import "../styles/user.css";

const Tasks = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { id } = jwtDecode(token);
    setUserId(id);

    const fetchProjects = async () => {
      try {
        const res = await getProjects(token);
        const filtered = res.data.filter((project) => {
          const assigned = project.assignedTo || [];
          const userAssigned = Array.isArray(assigned) && assigned.some((user) =>
            typeof user === "object" ? user._id === id : user === id
          );

          const progress = project.progress || [];
          const userProgress = progress.find((p) => p.user._id === id);
          return userAssigned && userProgress?.percent === 100;
        });

        setCompletedProjects(filtered);
      } catch (err) {
        console.error("Error loading completed tasks:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="user-page">
        <div className="user-container">
          <h1 className="user-title">My Completed Tasks</h1>
          {completedProjects.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            <div className="task-grid">
              {completedProjects.map((project) => (
                <div key={project._id} className="task-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <p><strong>Status:</strong> ✅ Completed</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
