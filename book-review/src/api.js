import axios from "axios";

// 1️⃣ Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies (refresh token)
});

// 2️⃣ Refresh token function
export const refreshToken = async () => {
  try {
    const res = await api.get("/refreshToken"); // backend route
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Refresh token failed:", err);
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    return null;
  }
};

// 3️⃣ Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 4️⃣ Response interceptor: handle 401 once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
