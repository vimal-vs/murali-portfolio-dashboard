import axiosInstance from './Axios';

const createPodcast = async (podcastDetails) => {
    try {
        const response = await axiosInstance.post('/podcasts/create', podcastDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAllPodcasts = async () => {
    try {
        const response = await axiosInstance.get('/podcasts/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getPodcastById = async (id) => {
    try {
        const response = await axiosInstance.get(`/podcasts/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updatePodcast = async (id, podcastDetails) => {
    try {
        const response = await axiosInstance.put(`/podcasts/update/${id}`, podcastDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deletePodcast = async (id) => {
    try {
        const response = await axiosInstance.delete(`/podcasts/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const PodcastService = {
    createPodcast,
    getAllPodcasts,
    getPodcastById,
    updatePodcast,
    deletePodcast
};

export default PodcastService;