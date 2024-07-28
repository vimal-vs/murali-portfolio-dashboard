import axiosInstance from './Axios';

const uploadFiles = async (data) => {
    try {
        const response = await axiosInstance.post('/image/upload', data);
        return response;
    } catch (error) {
        return error.response;
    }
};

const ImageService = {
    uploadFiles
};

export default ImageService;