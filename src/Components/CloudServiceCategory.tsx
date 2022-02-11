import React from 'react';
import { IServiceCategory } from '../shared/interfaces';
import CloudBlock from './CloudBlock';

function CloudServiceCategory(props: { serviceCategory: IServiceCategory, 
  filterCategories: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: IServiceCategory) => void }) {
    const { serviceCategory, filterCategories } = props;
    
    return (
        <div key={serviceCategory.name} 
            className={`${serviceCategory.cssClass} cloud-block-grid cloud-block-size cursor-pointer`}
            onClick={(event) => filterCategories(event, serviceCategory)}
        >
            <CloudBlock name={serviceCategory.name} />                
        </div>
    )
}

export default CloudServiceCategory;