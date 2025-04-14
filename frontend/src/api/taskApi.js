import axios from "axios";
import BASE_URL from "./config";

export const getTasks = async (token) => {
  return axios.get(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (data, token) => {
  return axios.post(`${BASE_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTaskStatus = async (taskId, status, token) => {
  return axios.put(`${BASE_URL}/tasks/${taskId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
