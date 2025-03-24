import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "https://django-react-backend-nzrz.onrender.com/api";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || apiUrl,
    timeout: 60000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log("Token being sent:", token || "No token found"); // Debugging token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Axios Request Error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error("🚨 Network Error: No connection to server!");
        } else {
            console.error(`Axios Error: ${error.response.status} - ${error.response.statusText}`);
            console.error("Response Data:", error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;
