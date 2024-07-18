import axiosInstance from './Axios';

const createTestimonial = async (testimonialDetails) => {
    try {
        const response = await axiosInstance.post('/testimonials/create', testimonialDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAllTestimonials = async () => {
    try {
        const response = await axiosInstance.get('/testimonials/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getTestimonialById = async (id) => {
    try {
        const response = await axiosInstance.get(`/testimonials/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateTestimonial = async (id, testimonialDetails) => {
    try {
        const response = await axiosInstance.put(`/testimonials/update/${id}`, testimonialDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteTestimonial = async (id) => {
    try {
        const response = await axiosInstance.delete(`/testimonials/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const TestimonialService = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
};

export default TestimonialService;