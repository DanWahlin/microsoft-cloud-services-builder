import * as React from 'react';
import { ICloudBlockData } from 'shared/interfaces';

export default function CloudBlock(props: ICloudBlockData) {
    const { name, image } = props;
    
    return ( 
        <div className={`service-picker-item`}>
            {image && 
                <img src={`/images/${image}`} alt="icon" className="icon" draggable="false"></img>
            }
            {name}
        </div>
    );
}