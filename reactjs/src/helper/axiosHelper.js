import axios from 'axios';




const apiService = axios.create({
    baseURL: 'http://localhost:5000/api',
})



apiService.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['authToken'] = `${token}`;
    }
    return request;
}, (error) => {
    return Promise.reject(error);
})

apiService.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})


export default apiService;  // export the apiService