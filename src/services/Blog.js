import axiosInstance from './Axios';

const create = async (blogDetails) => {
    try {
        const response = await axiosInstance.post('/blogs/create', blogDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const getAll = async () => {
    try {
        const response = await axiosInstance.get('/blogs/all');
        return response;
    } catch (error) {
        return error.response;
    }
};

const getById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blogs/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateById = async (id, blogDetails) => {
    try {
        const response = await axiosInstance.put(`/blogs/update/${id}`, blogDetails);
        return response;
    } catch (error) {
        return error.response;
    }
};

const deleteById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/blogs/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const BlogService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};

export default BlogService;