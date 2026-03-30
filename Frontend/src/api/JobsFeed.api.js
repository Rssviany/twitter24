import axiosInstance from "./AxiosInstance"


export const AllJobs=()=>{
    return axiosInstance.get('/all_jobs')
}