import axiosInstance from "./AxiosInstance"

export const nearByStore=()=>{
    return axiosInstance.get('/nearby');
}
export const allStores=()=>{
    return axiosInstance.get('/all_stores')
}