import { ProductParams } from './../models/common';
import axiosClient from "./axiosClient";


const productApi = {
    getAll(params:ProductParams){
        return axiosClient.get('/products', {params})
    }
}

export default productApi