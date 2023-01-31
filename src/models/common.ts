import { Product } from "./product";

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