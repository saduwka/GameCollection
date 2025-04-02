import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;  // Ваш ключ
const API_URL = 'https://api.rawg.io/api/platforms';

export const getConsoles = async () => {
    
    try {
        console.log('API Key:', apiKey);  // Проверим, что ключ доступен
        const response = await axios.get(`${API_URL}?key=${apiKey}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching consoles:', error);
      return [];
    }
  };