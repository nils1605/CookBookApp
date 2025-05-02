import axios from './axiosInstance';

export const register = (data: { username: string; email: string; password: string }) => {
  return axios.post('/auth/register', data);
};

export const login = (data: { email: string; password: string }) => {
  return axios.post('/auth/login', data);
};
