import axiosInstance from "../api/axiosInstance";

const AlbumRepository = {
  getAllAlbums: async (id_artista) => {
    try {
      const response = await axiosInstance.get(`/album/${id_artista}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      throw error;
    }
  },
  
};

export default AlbumRepository;

