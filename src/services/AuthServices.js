import axiosInstance from './Axios';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const register = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, {
      email,
      password
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default { login, register };
