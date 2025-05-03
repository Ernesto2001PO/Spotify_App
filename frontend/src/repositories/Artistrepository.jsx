import axiosInstance from "../api/axiosInstance";

const ArtistRepository = {
  getallArtist: async () => {
    try {
      const response = await axiosInstance.get("/artista/:id") ;
      return response.data;
    } catch (error) {
      console.error("Error fetching artist:", error);
      throw error;
    }
  },
};

export default ArtistRepository;
