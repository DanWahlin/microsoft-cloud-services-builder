import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IService, IServiceCategory } from '../shared/interfaces';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudService from './CloudService';
import CloudServiceCategory from './CloudServiceCategory';
import { Autocomplete, TextField } from '@mui/material';

function CloudServicePicker() {
    const [serviceCategories, setServiceCategories] = useState<IServiceCategory[]>([]);
    const [options, setOptions] = useState<{label: string}[]>([]);
    const [serviceCategory, setServiceCategory] = useState<IServiceCategory |  null>();

    useEffect(() => {
      const getServiceCategories = async () => {
        const res = await axios.get('/data/services.json');
        const data: IServiceCategory[] = res.data;
        setServiceCategories(data);
        const svcs = data.map((svcCat: IServiceCategory) => svcCat.services)
                         .reduce((prev, current) => [...prev, ...current])
                         .map((e, i) => ({ label: e.name }));
        setOptions(svcs);
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
                <CloudServiceCategory key={svcCat.id}
                  serviceCategory={svcCat}
                  filterCategories={filterCategories} />
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