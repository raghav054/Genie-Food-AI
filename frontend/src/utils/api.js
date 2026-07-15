// Centralized API configuration

import axios from "axios";
import qs from "qs";

// Useful while developing.
// Safe to remove later if you don't need the log.
console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
    }),
});

export default api;