import axios from 'axios';
export interface SubjectRequest {
    name : string;
    email : string;
    }
export interface SubjectResponse {
    id : number;
    name : string;
    }
export const subjectAPI = {
    add