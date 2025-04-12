import axios from "axios";
import BASE_URL from "./config";

export const registerUser = async (userData) => {
  return axios.post(`${BASE_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${BASE_URL}/auth/login`, userData);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getUserProfile = async (token) => {
  return axios.get(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
