
export interface Review {
    userId: string;
    productId: string;
    rating: number;
    productName: string | "";
    productImage: string;
    content: string;
    userName: string;
    userAvatar: string;
}