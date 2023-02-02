import axios from 'axios';

const baseURL = 'https://api-clone-tiki.vercel.app/api'

export const axiosClient = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json'
    }
})

export function axiosClientToken(accessToken:string) {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Headers': 'x-access-token',
            'x-access-token': accessToken
        }
    })
}