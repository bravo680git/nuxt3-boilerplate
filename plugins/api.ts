import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import apiService from '@/services/api';

export default defineNuxtPlugin(() => {
  const { getToken } = useAuthStore();

  const axiosInstance = axios.create({
    baseURL: String(import.meta.env.VITE_API_BASE_URL),
    headers: {
      'x-csv-key': String(import.meta.env.VITE_API_KEY),
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers['x-csv-token'] = getToken();
    return config;
  });

  axiosInstance.interceptors.response.use((res) => {
    return res && res.data;
  });

  const axiosMockupInstance = axios.create({
    baseURL: 'http://127.0.0.1:8082/mockup',
  });

  return {
    provide: {
      axios: axiosInstance,
      axiosM: axiosMockupInstance,
      api: apiService(axiosInstance),
      apiM: apiService(axiosMockupInstance),
    },
  };
});
