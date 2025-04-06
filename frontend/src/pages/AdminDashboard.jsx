import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import AdminNavbar from "../components/AdminNavbar";
import '../styles/admin.css';

const AdminDashboard = ({ token }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getProjects(token);
      setProjects(response.data);
    }
    fetchData();
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>
          <h2 className="subheading">All Projects</h2>
          <div className="project-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
          {/* <button
            className="logout-button"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
