import jwtDecode from 'jwt-decode';

export const saveToken = (token: string) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return jwtDecode<{ userId: string; email: string }>(token);
};
