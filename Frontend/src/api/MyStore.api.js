import axiosInstance from "./AxiosInstance"

export const getAllStores = () => {
    return axiosInstance.get('/mystore_getAll')
}

export const getSingleStore = (id) => {
    return axiosInstance.get(`/mystore/${id}`)
}

export const addComment = (id, data) => {
    return axiosInstance.post(`/mystore/${id}/comment`, data)
}

export const reviewPost = (id, data) => {
    return axiosInstance.post(`/mystore/${id}/review`, data)
}

export const likesToggle = (id) => {
    return axiosInstance.put(`/mystore/${id}/like`)
}