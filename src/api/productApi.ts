import { ProductParams, ResponseProduct } from './../models/common';
import {axiosClient} from "./axiosClient";


const productApi = {
    getAll(){
        return axiosClient.get('/products/all')
    },

    getPaginate: async(params:ProductParams) => {
        const res = await axiosClient.get('/products', {params})
        return res.data
    },

    getBySlug: async (slug: string) => {
        const res = await axiosClient.get(`/products/${slug}`)
        return res.data[0]
    },

    getFilterProducts: async (params:any) => {
        const res = await axiosClient.get('/products/filter', { params })
        return res.data;
    },

    getProducts: async (params:any) => {
        const res = await axiosClient.get('/products', { params })
        return res.data;
    },
}

export default productApi