
import { AxiosResponse } from "axios";
import { axiosClientToken, axiosClient } from "./axiosClient";
import { WishItem } from "models";

const userApi = {
    putUpdateInfo: async (accessToken:string, params:any) => {
        const res = await axiosClientToken(accessToken).put('/user/update', params)
        return res.data;
    },

    getInfo: async (accessToken:string , mobile:string) => {
        const res = await axiosClientToken(accessToken).get(`/user/${mobile}`)
        return res.data
    },

    getWishList:async(params: Partial<WishItem>) => {
        const res = await axiosClient.get('/wishList', {params})
        return res.data
    },

    getWishListByUser: async(userId:string) => {
        const res = await axiosClient.get(`/wishList/${userId}`)
        return res.data
    },

    postWishList: async (params:any) => {
        const res = await axiosClient.post(`/wishList`, params)
        return res.data
    },

    deleteWishList: async (id:any) => {
        const res = await axiosClient.delete(`/wishList/${id}`)
        return res.data
    },
}

export default userApi;