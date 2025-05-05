import axiosInstance from "../api/axiosInstance";

const GenreRepository = {
  getAllGenres: async () => {
    try {
      const response = await axiosInstance.get("/genero");
      return response.data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  },
  
  createGeneros: async (generosData) => {
    try {
      const response = await axiosInstance.post("/genero", generosData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating generos:", error);
      throw error;
    }
  },
  updateGeneros: async (id, generosData) => {
    try {
      const response = await axiosInstance.put(`/genero/${id}`, generosData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating generos:", error);
      throw error;
    }
  },
  getGenerosById: async (id) => {
    try {
      const response = await axiosInstance.get(`/genero/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching generos by ID:", error);
      throw error;
    }
  },
  deleteGeneros: async (id) => {
    try {
      const response = await axiosInstance.delete(`/genero/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting generos:", error);
      throw error;
    }
  },
};

export default GenreRepository;
