import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Service, ServiceCategory } from '../shared/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ServicePicker() {
    const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
    const [serviceCategory, setServiceCategory] = useState<ServiceCategory |  null>();

    useEffect(() => {
      const getServiceCategories = async () => {
        const res = await axios.get('/data/services.json');
        setServiceCategories(res.data);
      }

      getServiceCategories();
    }, []);

    const onDragStart = (event: React.DragEvent, service: Service) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(service));
        event.dataTransfer.effectAllowed = 'move';
      }
    };

    const filterCategories = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: ServiceCategory) => {
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
                   className={`${svcCat.className} service-picker-item cursor-pointer`}
                   onClick={(event) => filterCategories(event, svcCat)}
              >
                {svcCat.category}
              </div>
            ))}

            {/* Render services in service category */}
            {serviceCategory && serviceCategory.services.map((svc: Service) => (
              <div key={svc.id} 
                  className={`${serviceCategory.className} service-picker-item cursor-drag-drop`}
                  onDragStart={(event) => onDragStart(event, svc)} draggable
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