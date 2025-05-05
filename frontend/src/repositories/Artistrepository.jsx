import axiosInstance from "../api/axiosInstance";

const ArtistRepository = {
  getAllartists: async (id_genero) => {
    try {
      const response = await axiosInstance.get(`/artista/${id_genero}`);
      console.log("Response from backend:", response.data); 
      return response.data;
    } catch (error) {
      console.error("Error fetching artist:", error);
      throw error;
    }
  },
  getArtistas: async () => {
    try {
      const response = await axiosInstance.get(`/artista`);
      return response.data;
    } catch (error) {
      console.error("Error fetching artistass:", error);
      throw error;
    }
  },

  createArtistas: async (artistasData) => {
    try {
      const response = await axiosInstance.post("/artista", artistasData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating artistas:", error);
      throw error;
    }
  },
  updateArtistas: async (id, artistasData) => {
    try {
      const response = await axiosInstance.put(`/artista/${id}`, artistasData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating artistas:", error);
      throw error;
    }
  },
  getArtistasById: async (id) => {
    try {
      const response = await axiosInstance.get(`/artista/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching artistas by ID:", error);
      throw error;
    }
  },
  deleteArtistas: async (id) => {
    try {
      const response = await axiosInstance.delete(`/artista/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting artistas:", error);
      throw error;
    }
  },
};

export default ArtistRepository;
