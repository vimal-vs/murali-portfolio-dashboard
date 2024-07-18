import axiosInstance from './Axios';

const createEvent = async (eventDetails) => {
    try {
        const response = await axiosInstance.post('/events/create', eventDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAllEvents = async () => {
    try {
        const response = await axiosInstance.get('/events/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getEventById = async (id) => {
    try {
        const response = await axiosInstance.get(`/events/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateEvent = async (id, eventDetails) => {
    try {
        const response = await axiosInstance.put(`/events/update/${id}`, eventDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteEvent = async (id) => {
    try {
        const response = await axiosInstance.delete(`/events/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const EventService = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};

export default EventService;