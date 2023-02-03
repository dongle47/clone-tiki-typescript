import { Product } from "./product";
import { User } from "./user";

export interface ProductParams{
    page?: number;
    size?: number;
}

export interface ResponseProduct{
    totalItems: number;
    products: Product[],
    totalPages: number,
    currentPage: number,
}

export interface ResponseLogin{
    user: User;
    accessToken: string
}

export interface TokenDecode{
    id: string;
    exp: number;
}

export interface WishItem{
    _id: string
    productSlug: string;
    userId: string;
}
