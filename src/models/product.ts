export interface Category{
    id: string;
    name: string;
}

export interface DetailProduct{
    category: Category;
    images: String[];
    options: any;
    specifications: any
}

export interface Product {
    id: string;
    image: string;
    name: string;
    rate: number;
    price: number;
    discount: number;
    sold: number;
    details: DetailProduct;
}