import React from 'react';
import { IService, IServiceCategory } from '../shared/interfaces';
import CloudBlock from './CloudBlock';

function CloudService(props: { serviceCategory: IServiceCategory, service: IService  }) {
    const {serviceCategory, service} = props;

    const onDragStart = (event: React.DragEvent, service: IService) => {
        if (event.dataTransfer) {
          event.dataTransfer.setData('application/reactflow', JSON.stringify(service));
          event.dataTransfer.effectAllowed = 'move';
        }
    };

    return (
        <div key={service.id} 
            className={`${serviceCategory.cssClass} cloud-block-grid cloud-block-size cursor-drag-drop`}
            onDragStart={(event) => onDragStart(event, { 
            ...service, 
            category: serviceCategory.category,
            cssClass: serviceCategory.cssClass 
            })} draggable
        >
            <CloudBlock name={service.name} 
                description={service.desciption} 
                image={service.image} 
                cssClass={serviceCategory.cssClass}
            />
        </div>

    );
}

export default CloudService;