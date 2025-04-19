import axios from "axios";
import BASE_URL from "./config";

//get all users
export const getUsers = async (token) => {
    return axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};
  
//get user by ID
export const getUserById = async (id, token) => {
  return await axios.get(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};