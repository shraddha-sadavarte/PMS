import axios from "axios";
import BASE_URL from "./config";

export const getProjects = async (token) => {
  return axios.get(`${BASE_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProject = async (data, token) => {
  return axios.post(`${BASE_URL}/projects`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
