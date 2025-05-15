import axiosInstance from "../api/axiosInstance";

const AuthLoginRepository = {
  postLogin: async () => {
    try {
      const response = await axiosInstance.get(`/artista/`);
      console.log("Response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching artist:", error);
      throw error;
    }
  },
};
