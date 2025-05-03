
import axiosInstance from "../api/axiosInstance";

const ArtistRepository = {
  getAllartists: async (id_genero) => {
    
    try {
      const response = await axiosInstance.get(`/artista/${id_genero}`);
      console.log("Response from backend:", response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching artist:", error);
      throw error;
    }
  },
};

export default ArtistRepository;
