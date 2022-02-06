import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IService, IServiceCategory } from '../shared/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CloudService from './CloudService';
import CloudServiceCategory from './CloudServiceCategory';

function CloudServicePicker() {
    const [serviceCategories, setServiceCategories] = useState<IServiceCategory[]>([]);
    const [serviceCategory, setServiceCategory] = useState<IServiceCategory |  null>();

    useEffect(() => {
      const getServiceCategories = async () => {
        const res = await axios.get('/data/services.json');
        setServiceCategories(res.data);
      }

      getServiceCategories();
    }, []);

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
            {!serviceCategory && serviceCategories.map(svcCat => (
                <CloudServiceCategory key={svcCat.id} 
                  serviceCategory={svcCat} 
                  filterCategories={filterCategories} 
                />
            ))}

            {serviceCategory && serviceCategory.services.map((service: IService) => (
                <CloudService key={service.id} 
                  serviceCategory={serviceCategory} 
                  service={service} 
                />
            ))}   

        </div>
      </>
    );
  }
  
  export default CloudServicePicker;