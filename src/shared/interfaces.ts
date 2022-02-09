export interface IServiceCategory {
    name: string;
    serviceNames: string[];
    cssClass: string;
    services: IService[];
}

export interface IService {
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