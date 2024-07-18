import axiosInstance from './Axios';

const create = async (eventDetails) => {
    try {
        const response = await axiosInstance.post('/events/create', eventDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAll = async () => {
    try {
        const response = await axiosInstance.get('/events/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/events/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateById = async (id, eventDetails) => {
    try {
        const response = await axiosInstance.put(`/events/update/${id}`, eventDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/events/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const EventService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};

export default EventService;