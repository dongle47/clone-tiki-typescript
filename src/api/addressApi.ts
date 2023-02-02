import { axiosClientToken } from "./axiosClient"

const addressApi = {
    getAddressById: async (accessToken:string, id:string) => {
        const res = await axiosClientToken(accessToken).get(`/address/byId/${id}`)
        return res.data
    },

    getAddressByUser: async (accessToken:string, userId:string) => {
        const res = await axiosClientToken(accessToken).get(`/address/${userId}`)
        return res.data
    },

    postAddress: async (accessToken:string, params:string) => {
        const res = await axiosClientToken(accessToken).post('/address', params)
        return res.data;
    },

    putAddress: async (accessToken:string, params:string) => {
        const res = await axiosClientToken(accessToken).put(`/address/`, params)
        return res.data
    },

    deleteAddress: async (accessToken:string, id:string) => {
        const res = await axiosClientToken(accessToken).delete(`/address/${id}`)
        return res.data;
    },
}

export default addressApi