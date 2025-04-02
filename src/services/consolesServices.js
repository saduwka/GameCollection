// src/services/consolesService.js
import axios from 'axios';

const API_URL = 'https://api.rawg.io/api/platforms';
const apiKey = '97d7d537cfa34027be12ab4dfea87d96'; 

export const getConsoles = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching consoles:', error);
    return [];
  }
};

export const getConsoleDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching console details:', error);
    return null;
  }
};