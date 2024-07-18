import axiosInstance from './Axios';

const create = async (podcastDetails) => {
    try {
        const response = await axiosInstance.post('/podcasts/create', podcastDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAll = async () => {
    try {
        const response = await axiosInstance.get('/podcasts/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/podcasts/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateById = async (id, podcastDetails) => {
    try {
        const response = await axiosInstance.put(`/podcasts/update/${id}`, podcastDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/podcasts/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const PodcastService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};

export default PodcastService;