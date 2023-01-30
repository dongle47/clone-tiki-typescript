import axios from 'axios';

const baseURL = 'https://api-clone-tiki.vercel.app/api'

const axiosClient = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json'
    }
})

export default axiosClient