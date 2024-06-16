// src/utils/api.js
import axios from 'axios';

export const fetchUserData = async (endpoint:string, token = null, params = {}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get(endpoint, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
