import {axiosClient} from "./axiosClient";

const authApi = {
    postLogin: async (params:any) => {
        const res = await axiosClient.post('/auth/login', params)
        return res.data;
    },

    postRegister: async (params:any) => {
        const res = await axiosClient.post('/auth/register', params)
        return res.data
    },
}

export default authApi