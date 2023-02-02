import axios from 'axios';

const axiosLocation = axios.create({
    baseURL: "https://provinces.open-api.vn/api/",
    headers: {
        "Content-Type": "application/json"
    },
});

const locationApi = {
    getListProvinces: async () => {
        const res = await axiosLocation.get('/p')
        return res.data
    },

    getProvince: async (code:string) => {
        const res = await axiosLocation.get(`/p/${code}?depth=2`)
        return res.data
    },

    getListDistricts: async () => {
        const res = await axiosLocation.get('/d')
        return res.data
    },

    getDistrict: async (code:string) => {
        const res = await axiosLocation.get(`/d/${code}?depth=2`)
        return res.data
    },

    getListWards: async () => {
        const res = await axiosLocation.get('/w')
        return res.data
    },

    getWard: async (code:string) => {
        const res = await axiosLocation.get(`/w/${code}`)
        return res.data
    }

}
export default locationApi;