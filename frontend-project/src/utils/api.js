const API_URL = 'http://localhost:3000/';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch(`${API_URL}auth/check-auth`, {
    credentials: 'include',
  });
  return response.json();
};