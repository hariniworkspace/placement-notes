import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ONLY the domain here
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Handle 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.error("Unauthorized — token missing/expired");
    }
    return Promise.reject(err);
  }
);

export default API;
