import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://chat-app-bws2.onrender.com/api',
    withCredentials: true
})