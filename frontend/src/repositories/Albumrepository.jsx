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
  getAlbumes: async () => {
    try {
      const response = await axiosInstance.get(`/album`);
      return response.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      throw error;
    }
  },

  createAlbum: async (albumData) => {
    try {
      const response = await axiosInstance.post("/album", albumData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
  },
  updateAlbum: async (id, albumData) => {
    try {
      const response = await axiosInstance.put(`/album/${id}`, albumData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating album:", error);
      throw error;
    }
  },
  getAlbumById: async (id) => {
    try {
      const response = await axiosInstance.get(`/album/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching album by ID:", error);
      throw error;
    }
  },
  deleteAlbum: async (id) => {
    try {
      const response = await axiosInstance.delete(`/album/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting album:", error);
      throw error;
    }
  },
};

export default AlbumRepository;
