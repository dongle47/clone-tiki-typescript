import { Review } from 'models/review';
import { axiosClient } from './axiosClient';

const reviewsApi = {
    postReview: async (params:any) => {
        const res = await axiosClient.post('/reviews/', params)
        return res.data;
    },

    findReviews: async (params:any) => {
        const res = await axiosClient.post('/reviews/find', params)
        return res.data;
    },


}
export default reviewsApi; 