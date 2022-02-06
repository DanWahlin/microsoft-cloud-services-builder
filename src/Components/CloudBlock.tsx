import * as React from 'react';
import { ICloudBlockData } from '../shared/interfaces';

function CloudBlock(props: ICloudBlockData) {
    let { name, cssClass, image, description } = props;
    return ( 
        <div className={`cloud-block-grid ${cssClass}`} title={description}>
            {image && 
                <img src={`/images/${image}`} alt="icon" className="icon" draggable="false"></img>
            }
            {name}
        </div>
    );
}

export default CloudBlock;