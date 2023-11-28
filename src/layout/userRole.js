// userService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your server's URL

export const getUserRole = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-role?email=${email}`);
    return response.data.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};
