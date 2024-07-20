import axiosInstance from './Axios';

const create = async (commonDetails) => {
    try {
        const response = await axiosInstance.post('/common/create', commonDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/common/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateById = async (id, commonDetails) => {
    try {
        const response = await axiosInstance.put(`/common/update/${id}`, commonDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const CommonService = {
    create,
    getById,
    updateById,
};

export default CommonService;