import axios from 'axios';

const axiosClient = axios.create({
baseURL: 'http://localhost:8080',
headers: {
'Content-Type': 'application/json',
}
});
// tu dong kem jwt token vao request
axiosClient.interceptors.request.use((config) => {
    //lay token tu loicalStorage
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
}
);
// ham xu ly du lieu hoac tra ve loi
axiosClient.interceptors.response.use((response) => {
    return response.data;

    } , (error) => {
    if (error.response?.status === 401) {
    console.log('Unauthorized, redirecting to login...');

    }
    return Promise.reject(error);
});
export default axiosClient;