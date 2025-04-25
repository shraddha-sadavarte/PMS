import axios from "axios";
import BASE_URL from "./config";

export const fetchDashboardMetrics = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/dashboard/metrics`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
        // Rethrow the error to be caught by the component
        throw error;
    }
};