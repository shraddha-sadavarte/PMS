import axios from "axios";
import BASE_URL from "./config";

export const getUsers = async (token) => {
    return axios.get(`${BASE_URL}/users`, {
        headers: {Authorization: `Bearer ${token}`},
    });
};