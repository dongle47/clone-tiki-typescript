export interface Category{
    id: string;
    name: string;
}

export interface DetailProduct{
    category: Category;
    images: string[];
    options: any;
    specifications: any;
    description: any;
}

export interface Product {
    id: string;
    image: string;
    name: string;
    rate: number;
    price: number;
    discount: number;
    slug: string;
    sold: number;
    details: DetailProduct;
}