import axios from "axios";
import BASE_URL from "./config";

// This will become http://localhost:5000/api/projects/user
export const getProjects = async (token, isAdmin = false) => {
  const url = isAdmin
    ? `${BASE_URL}/projects`               // GET all projects (admin)
    : `${BASE_URL}/projects/user`;        // GET user-specific projects
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// http://localhost:5000/api/projects
export const createProject = (projectData, token) =>
  axios.post(`${BASE_URL}/projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//  http://localhost:5000/api/projects/:id/progress
export const updateProjectProgress = async (projectId, percent, token) => {
  return await axios.put(`${BASE_URL}/projects/${projectId}/progress`, { percent }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//update project by id
export const updateProjectById = async (id, data, token) => {
  return await axios.put(`${BASE_URL}/projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//delete project
export const deleteProjectById = (projectId, token) => {
  return axios.delete(`${BASE_URL}/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
