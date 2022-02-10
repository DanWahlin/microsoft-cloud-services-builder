import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { IService, IServiceCategory } from '../shared/interfaces';
import CloudBlock from './CloudBlock';

function CloudService(props: { serviceCategory: IServiceCategory, service: IService  }) {
    const {serviceCategory, service} = props;

    const onDragStart = (event: React.DragEvent, service: IService) => {
        let dragData = { 
            ...service, 
            category: serviceCategory.name,
            cssClass: serviceCategory.cssClass 
        };
        if (event.dataTransfer) {
          event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
          event.dataTransfer.effectAllowed = 'move';
        }
    };

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: '#4b4b4b',
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#4b4b4b',
          fontSize: '12px',
        },
    }));

    return (
        <HtmlTooltip
            title={
                <>
                    <Typography color="inherit">{service.name}</Typography>
                    <span>{service.description}</span>
                </>
            }
        >
            <div key={service.name} 
                className={`${serviceCategory.cssClass} cloud-block-grid cloud-block-size cursor-drag-drop`}
                onDragStart={(event) => onDragStart(event, service)} draggable
            >
                <CloudBlock name={service.name} 
                    description={service.description} 
                    image={service.image} 
                    cssClass={serviceCategory.cssClass}
                />
            </div>
        </HtmlTooltip>
    );
}

export default CloudService;