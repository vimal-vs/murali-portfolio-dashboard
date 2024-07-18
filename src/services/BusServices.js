import axiosInstance from './Axios';

const create = async (busDetails) => {
    try {
        const response = await axiosInstance.post(`/bus/create`, busDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getBuses = async () => {
    try {
        const response = await axiosInstance.get(`/bus/all`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/bus/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const update = async (id, busDetails) => {
    try {
        const response = await axiosInstance.put(`/bus/update/${id}`, busDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const remove = async (id) => {
    try {
        const response = await axiosInstance.delete(`/bus/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const Bus = {
    create,
    getBuses,
    getById,
    update,
    remove
};

export default Bus;