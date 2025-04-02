import axios from 'axios';

const API_URL = 'https://api.rawg.io/api/games';

export const getGameDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};