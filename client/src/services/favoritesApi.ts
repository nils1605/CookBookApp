import axios from './axiosInstance';

export const addFavorite = (recipeId: number) => {
  return axios.post(`/favorites/${recipeId}`);
};

export const removeFavorite = (recipeId: number) => {
  return axios.delete(`/favorites/${recipeId}`);
};

export const getFavorites = () => {
  return axios.get(`/favorites`);
};
