import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:'http://localhost:6868/',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
});

axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const message=error.response.data.message || 'Something Went Wrong'
        console.log('Global Error:',message);

        if(error.response?.status===401){
            window.location.href='/login'
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;