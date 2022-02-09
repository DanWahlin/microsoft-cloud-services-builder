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
    cssClass: string;
    category: string;
    relatedServices: string[];
    azureCLICommand: string[];
    document: IDocument[];
    learnModules: ILearn[]
}

export interface IDocument {
    name: string;
    url: string;
}

export interface ILearn {
    type: LearnType;
    name: string;
    modules: ILearnModule[]
}

export interface ILearnModule extends IDocument {

}

export interface ICloudBlockData { 
    name: string, 
    cssClass?: string, 
    image?: string, 
    description?: string 
}

export type LearnType = 'path' | 'module';