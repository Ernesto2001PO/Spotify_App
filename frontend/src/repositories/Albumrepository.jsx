import axiosInstance from "../api/axiosInstance";

const AlbumRepository = {
  getAllAlbums: async () => {
    try {
      const response = await axiosInstance.get("/album");
      return response.data;
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  },
};

export default AlbumRepository;
