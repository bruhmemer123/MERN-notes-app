import axios from "axios"
const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5001/api";
const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error)
    }
);
export default api
