import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import { ICloudBlockData } from 'shared/interfaces';


export default function CloudBlock(props: ICloudBlockData) {
    const { name, image, showDeleteButton, deleteService } = props;
    
    return ( 
        <div className={`service-picker-item`}>
            {showDeleteButton && deleteService && (
                <div className="delete-button-container" draggable="false" onClick={() => deleteService('Delete')}>
                    <ClearIcon className="delete-button" />
                </div>
            )}
            {image && 
                <img src={`/images/${image}`} alt="icon" className="icon" draggable="false"></img>
            }
            {name}
        </div>
    );
}