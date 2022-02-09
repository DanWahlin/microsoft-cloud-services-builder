export interface IServiceCategory {
    name: string;
    services: string[];
    cssClass: string;
    servicesData?: IService[];
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