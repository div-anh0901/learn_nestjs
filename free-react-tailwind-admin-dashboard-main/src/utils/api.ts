import axios, {AxiosRequestConfig} from 'axios';
import { User } from './type';

const API_URL  =  "http://localhost:3000"
const config: AxiosRequestConfig = { withCredentials: true };

export const getAuthUser = ()=>{
    return axios.get<User>(`${API_URL}/auth/me`, config);
 }
 