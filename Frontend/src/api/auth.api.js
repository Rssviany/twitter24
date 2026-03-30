import axiosInstance from "./AxiosInstance"


export const loginUser = (data) => {
    return axiosInstance.post('/api/auth/login', data);
};

export const getCurrentUser = () => {
    return axiosInstance.get("/api/auth/me");
};

export const logoutUser = () => {
  return axiosInstance.post("/api/auth/logout");
};

export const signUpUser = (data) => {
    return axiosInstance.post('/api/auth/register', data)
};

export const forgotPassword = (data) => {
    return axiosInstance.post('/api/auth/forget_password', data)
};

export const verifyOTP = (data) => {
    return axiosInstance.post('/api/auth/verify_otp', data)
};

export const setPassword = (data) => {
    return axiosInstance.post(`/api/auth/reset_password`, data)
};