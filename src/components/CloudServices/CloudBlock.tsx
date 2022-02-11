import * as React from 'react';
import { ICloudBlockData } from 'shared/interfaces';

export default function CloudBlock(props: ICloudBlockData) {
    const { name, cssClass, image } = props;
    
    return ( 
        <div className={`cloud-block-grid ${cssClass}`}>
            {image && 
                <img src={`/images/${image}`} alt="icon" className="icon" draggable="false"></img>
            }
            {name}
        </div>
    );
}