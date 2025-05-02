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
}

export default GenreRepository;