import axios from 'axios';
import axiosClient from './AxiousClient';
export interface SubjectRequest {
    name : string;
    email : string;
    }
export interface SubjectResponse {
    id : number;
    name : string;
    }
export interface EventResponse {
    id: number;
    title: string;
    subjectName?: string;
    subject?: string;
    date: string;
    time: string;
    location?: string;
    color?: string;
}
 const subjectAPI = {
    addSubject: (data : SubjectRequest): Promise<SubjectResponse> => {
        const url = '/subjects/add';
        return axiosClient.post(url, data);
        },


        getSubjects: async (): Promise<SubjectResponse[]> => {
            const response = await axiosClient.get('/subjects/list');
            return response;
        },


        getEvents: async (): Promise<EventResponse[]> => {
            const response = await axiosClient.get('/events/list');
            return response;
        },
    };

export default subjectAPI;
