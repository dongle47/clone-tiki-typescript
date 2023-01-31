import { ProductParams } from './../models/common';
import axiosClient from "./axiosClient";


const productApi = {
    getAll(){
        return axiosClient.get('/products/all')
    },

    getPaginate(params:ProductParams){
        return axiosClient.get('/products', {params})
    },

    getBySlug(slug: string){
        return axiosClient.get(`/products/${slug}`)
    }
}

export default productApi