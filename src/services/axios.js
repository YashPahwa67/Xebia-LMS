// Configured Axios instance with interceptors (auth token + error normalisation).
import axios from "axios";
import { API_BASE_URL } from "@/config/env";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach access token if present.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("xebia_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise errors to the SDD error envelope shape.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const envelope = error.response?.data?.error;
    return Promise.reject(new Error(envelope?.message || error.message || "Request failed"));
  }
);
