import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor to handle role-based authorization
// axiosInstance.interceptors.response.use(
//     response => {
//         if (response.status === 401) {
//         }
//         const roles = response.data.roles;
//         if (roles.includes('admin')) {
//         } else if (roles.includes('user')) {
//         }

//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
