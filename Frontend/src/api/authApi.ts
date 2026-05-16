import axios from 'axios';
import axiosClient from './AxiousClient';

// kieu du lieu cho dang nhap
interface LoginRequest {
    email : string;
    password : string;
}
// tra ve
interface AuthResponse {
    token : string
    }
const authAPI = {
    login: (data : LoginRequest): Promise<AuthResponse> => {
     const url = '/auth/login';
        return axiosClient.post(url, data);
        }
        };
    export default authAPI;
