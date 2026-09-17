import axios from "axios"
const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5001/api";
const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
);
export default api
