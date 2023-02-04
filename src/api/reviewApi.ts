import { Review } from 'models/review';
import { axiosClient } from './axiosClient';

const apiReviews = {
    postReview: async (params:Review) => {
        const res = await axiosClient.post('/reviews/', params)
        return res.data;
    },

    findReviews: async (params:Review) => {
        const res = await axiosClient.post('/reviews/find', params)
        return res.data;
    },


}
export default apiReviews; 