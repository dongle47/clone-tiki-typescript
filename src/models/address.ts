export interface Location{
    code: string;
    name: string 
}

export interface Address{
    fullName: string,
    phone: string,
    province: object
    district: object,
    ward: object,
    detail: string,
    userId: string,

}