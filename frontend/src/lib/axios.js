import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === 'development' ?  'http://localhost:3000' : import.meta.env.REACT_APP_API_URL,
    withCredentials: true
})