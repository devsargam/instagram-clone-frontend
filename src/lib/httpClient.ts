import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.BACKEND_ENDPOINT,
});

export function setAxiosAuthHeader(token: string) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
