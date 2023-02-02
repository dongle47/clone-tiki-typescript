export interface Location{
    code: string;
    name: string 
}

export interface Address{
    _id: string;
    fullName: string,
    phone: string,
    province: Location
    district: Location,
    ward: Location,
    detail: string,
    userId: string,
}