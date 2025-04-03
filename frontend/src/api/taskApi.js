import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (data, token) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
