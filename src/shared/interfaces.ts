export interface ServiceCategory {
    id: number,
    category: string;
    services: Service[];
    className: string;
}

export interface Service {
    id: number,
    name: string;
    desciption: string;
    image: string;
}