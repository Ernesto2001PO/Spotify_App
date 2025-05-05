import axiosInstance from "../api/axiosInstance";

const SongRepository = {
  getAllSongs: async () => {
    try {
      const response = await axiosInstance.get("/cancion");
      return response.data;
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  },
  createSong: async (songData) => {
    try {
      const response = await axiosInstance.post("/cancion", songData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating song:", error);
      throw error;
    }
    },
    updateSong: async (id, songData) => {
      try {
        const response = await axiosInstance.put(`/cancion/${id}`, songData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating song:", error);
        throw error;
      }
    },
    getSongById: async (id) => {
      try {
        const response = await axiosInstance.get(`/cancion/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching song by ID:", error);
        throw error;
      }
    },
    deleteSong: async (id) => {
      try {
        const response = await axiosInstance.delete(`/cancion/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error deleting song:", error);
        throw error;
      }
    },
  
  
  
};

export default SongRepository;
