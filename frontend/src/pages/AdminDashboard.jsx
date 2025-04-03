import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";

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
    <div>
      <div className="p-4">Welcome to the Admin Dashboard!</div>;
      <h2>All Projects</h2>
      {projects.map((project) => (
        <div key={project._id}>{project.name}</div>
      ))}
    </div>
  );
};

export default AdminDashboard;
