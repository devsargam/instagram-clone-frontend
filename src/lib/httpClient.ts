import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});

export function setAxiosAuthHeader(token: string) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
