export interface IServiceCategory {
    name: string;
    serviceNames: string[];
    cssClass: string;
    services: IService[];
}

export interface IService {
    name: string;
    description: string;
    image: string;
    cssClass: string;
    category: string;
    relatedServices: string[];
    azureCLICommand: string[];
    documents: IDocument[];
    learnContent: ILearnContent[]
}

export interface IDocument {
    name: string;
    url: string;
}

export interface ILearnContent extends IDocument {
    type: LearnType;
    image: string;
    modules: IDocument[]
}

export interface ICloudBlockData { 
    name: string, 
    cssClass?: string, 
    image?: string, 
    description?: string,
    showDeleteButton?: boolean
    deleteService?: (service: string) => void;
}

export type LearnType = 'path' | 'module';

export type ServiceCategoryType = 'categories' | 'scenarios';