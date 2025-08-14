import axios, { AxiosError, type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
export const getAccessToken = () => accessToken;

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      setAccessToken(null);
    }
    return Promise.reject(error);
  }
);

export default api;
