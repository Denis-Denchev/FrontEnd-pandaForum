import api from './api';

export const register = async (userData: {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  birth_date: string;
  sex: 'MALE' | 'FEMALE';
}) => {
  const response = await api.post('/v1/user/register', userData);
  return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post('/v1/user/login', 
    `username=${credentials.username}&password=${credentials.password}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  localStorage.setItem('username', credentials.username)
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('username');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  const res = await fetch(`http://127.0.0.1:8000/api/v1/user/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
};