// src/utils/api.js
import axios from 'axios';

export const fetchUserData = async (username:string, token:string|null = null, params = {}) => {
    
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get('https://api.github.com/users/'+username, {
      headers,
      params,
    });
    console.log(response.data,"response")
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
