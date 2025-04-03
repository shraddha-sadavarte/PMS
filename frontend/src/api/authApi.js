import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getUserProfile = async (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
