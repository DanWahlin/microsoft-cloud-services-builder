import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IService, IServiceCategory } from '../shared/interfaces';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudService from './CloudService';
import CloudServiceCategory from './CloudServiceCategory';

function CloudServicePicker() {
    const [serviceCategories, setServiceCategories] = useState<IServiceCategory[]>([]);
    const [services, setServices] = useState<IService[]>([]);
    const [serviceCategory, setServiceCategory] = useState<IServiceCategory |  null>();

    useEffect(() => {
      const getServiceCategories = async () => {
        const svcCatsResponse = await axios.get('/data/serviceCategories.json');
        const svcCats: IServiceCategory[]  = svcCatsResponse.data;
        setServiceCategories(svcCats);

        const svcsResponse = await axios.get('/data/services.json');
        const svcs: IService[] = svcsResponse.data;
        setServices(svcs);
      }

      getServiceCategories();
    }, []);

    const filterCategories = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: IServiceCategory) => {
      setServiceCategory(svcCat);
    };

    const getCategoryServices = (svcCat: IServiceCategory) => {
      let serviceNames = svcCat.serviceNames;
      svcCat.services = [];
      for (let svcName of serviceNames) {
        let svcs = services.filter(svc => svc.name === svcName);
        svcCat.services.push(...svcs);
      }
      return svcCat;
    };

    const goBack = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setServiceCategory(null);
    };

    return (
      <>
        {serviceCategory && (
          <div onClick={(event) => goBack(event)}>
              <ArrowBackIcon className="back-button" />
          </div>
        )}
        <div className="service-picker">
            {/* {!serviceCategory && (
                <Autocomplete
                  id="combo-box-options"
                  options={options}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Search services" />} />
            )} */}
            {!serviceCategory && serviceCategories.map(svcCat => (
                <CloudServiceCategory key={svcCat.name}
                  serviceCategory={svcCat}
                  filterCategories={filterCategories} />
            ))}

            {serviceCategory && getCategoryServices(serviceCategory).services.map((service: IService) => (
                <CloudService key={service.name} 
                  serviceCategory={serviceCategory} 
                  service={service} 
                />
            ))}   

        </div>
      </>
    );
  }
  
  export default CloudServicePicker;