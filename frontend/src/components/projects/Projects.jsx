import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projectApi";
import '../../styles/projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProjects(token).then(res => setProjects(res.data));
    }
  }, []);

  return (
    <div className="projects-page">
      <h2>All Projects</h2>
      <div className="project-list">
        {projects.length > 0 ? projects.map(project => (
          <div className="project-item" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )) : <p>No projects found.</p>}
      </div>
    </div>
  );
};

export default Projects;
