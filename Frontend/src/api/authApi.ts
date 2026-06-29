import axios from 'axios';
import axiosClient from './AxiousClient';

// kieu du lieu cho dang nhap
export interface LoginRequest {
    email : string;
    password : string;
}
// tra ve
export interface AuthResponse {
    token : string
    }
export interface RegisterRequest {
    msv : string;
    email : string;
    password : string;
    confirmPassword : string;
}
export const authAPI = {
    login: (data : LoginRequest): Promise<AuthResponse> => {
     const url = '/auth/login';
        return axiosClient.post(url, data);
        },
    register: (data : RegisterRequest): Promise<AuthResponse> => {
        const url = '/auth/register';
        return axiosClient.post(url, {

                msv: Number(data.msv),

                email: data.email,
                password: data.password

            });
    },
        getProfile: () : Promise<UserProfileResponse> => {
            const url = '/auth/me';
            return axiosClient.get(url);
            }

        };
    export default authAPI;
