import axios from './axiosInstance';

export const getAllRecipes = () => {
  return axios.get('/recipes');
};
