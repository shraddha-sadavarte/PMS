import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

export const getProjects = async (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProject = async (data, token) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
