import axios from "axios"
const api=axios.create({
    baseURL: "https://mern-notes-app-iq0h.onrender.com/api"
})
export default api