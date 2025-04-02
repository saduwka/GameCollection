import axios from "axios";

const API_URL = "https://api.rawg.io/api/creators";
const apiKey = "97d7d537cfa34027be12ab4dfea87d96";

export const getCreatorsDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?key=${apiKey}`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found"); 
  }
};

