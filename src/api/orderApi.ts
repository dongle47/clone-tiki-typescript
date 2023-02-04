import { axiosClientToken } from './axiosClient';

const orderApi = {
    getOrders: async (accessToken:string, userId:string) => {
        const res = await axiosClientToken(accessToken).get(`/order/${userId}`)
        return res.data;
    },

    postOrder: async (accessToken:string, params:any) => {
        const res = await axiosClientToken(accessToken).post('/order/', params)
        return res.data;
    },
}
export default orderApi;