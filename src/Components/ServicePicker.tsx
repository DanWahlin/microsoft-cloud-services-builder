import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IService, IServiceCategory } from '../shared/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ServicePicker() {
    const [serviceCategories, setServiceCategories] = useState<IServiceCategory[]>([]);
    const [serviceCategory, setServiceCategory] = useState<IServiceCategory |  null>();

    useEffect(() => {
      const getServiceCategories = async () => {
        const res = await axios.get('/data/services.json');
        setServiceCategories(res.data);
      }

      getServiceCategories();
    }, []);

    const onDragStart = (event: React.DragEvent, service: IService) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(service));
        event.dataTransfer.effectAllowed = 'move';
      }
    };

    const filterCategories = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: IServiceCategory) => {
      setServiceCategory(svcCat);
    }

    const goBack = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setServiceCategory(null);
    }

    return (
      <>
        <h1>Microsoft Cloud Services</h1>
        {serviceCategory && (
          <div onClick={(event) => goBack(event)}>
              <FontAwesomeIcon icon={faCircleArrowLeft} className="back-button" title="Go back" />
          </div>
        )}
        <div className="service-picker">
            {/* Render service categories */}
            {!serviceCategory && serviceCategories.map(svcCat => (
              <div key={svcCat.id} 
                   className={`${svcCat.cssClass} cloud-block-grid cloud-block-size cursor-pointer`}
                   onClick={(event) => filterCategories(event, svcCat)}
              >
                {svcCat.category}
              </div>
            ))}

            {/* Render services in service category */}
            {serviceCategory && serviceCategory.services.map((svc: IService) => (
              <div key={svc.id} 
                  className={`${serviceCategory.cssClass} cloud-block-grid cloud-block-size cursor-drag-drop`}
                  onDragStart={(event) => onDragStart(event, { 
                    ...svc, 
                    category: serviceCategory.category,
                    cssClass: serviceCategory.cssClass 
                  })} draggable
              >
                  <img src={`/images/${svc.image}`} alt="icon" className="icon"></img>
                  {svc.name}
              </div>
            ))}   

        </div>
      </>
    );
  }
  
  export default ServicePicker;