export interface IServiceCategory {
    id: number,
    category: string;
    services: IService[];
    cssClass: string;
}

export interface IService {
    id: number,
    name: string;
    desciption: string;
    image: string;
    cssClass?: string;
    category?: string;
}

export interface ICloudBlockData { 
    name: string, 
    cssClass?: string, 
    image?: string, 
    description?: string 
}