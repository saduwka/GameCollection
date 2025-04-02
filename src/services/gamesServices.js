import axios from "axios";

export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=97d7d537cfa34027be12ab4dfea87d96`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
