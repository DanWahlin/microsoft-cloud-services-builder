import * as React from 'react';

function FlowBlock(props: { name: string }) {
    return ( 
        <div>
            {props.name}
        </div>
    );
}

export default FlowBlock;