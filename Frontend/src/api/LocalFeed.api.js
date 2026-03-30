import axiosInstance from "./AxiosInstance"


export const localPost=(data)=>{
    return axiosInstance.post('/local_post',data);
}

export const AllLocalFeeds=()=>{
    return axiosInstance.get('/get_local_feeds');
}
export const togglerLikes=(postId)=>{
    return axiosInstance.post(`/posts/${postId}/like`);
}
export const commentAdd=(postId,data)=>{
    return axiosInstance.post(`/posts/${postId}/like`,data);
}
export const searchByCity=(city)=>{
    return axiosInstance.post(`/posts/city/${city}`);
}