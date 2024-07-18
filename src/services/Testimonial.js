import axiosInstance from './Axios';

const create = async (testimonialDetails) => {
    try {
        const response = await axiosInstance.post('/testimonials/create', testimonialDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAll = async () => {
    try {
        const response = await axiosInstance.get('/testimonials/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/testimonials/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateById = async (id, testimonialDetails) => {
    try {
        const response = await axiosInstance.put(`/testimonials/update/${id}`, testimonialDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/testimonials/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const TestimonialService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};

export default TestimonialService;