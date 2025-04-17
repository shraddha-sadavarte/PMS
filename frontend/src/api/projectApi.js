import axios from "axios";
import BASE_URL from "./config";

export const getProjects = async (token, isAdmin = false) => {
  const url = isAdmin ? BASE_URL : `${BASE_URL}/users`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProject = async (data, token) => {
  return await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProjectProgress = async (projectId, percent, token) => {
  return await axios.put(`${BASE_URL}/${projectId}/progress`, { percent }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
