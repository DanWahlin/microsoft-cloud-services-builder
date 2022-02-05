import React, { useRef, useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  OnLoadParams,
  EdgeTypesType,
  Elements,
  Connection,
  Edge,
  ArrowHeadType,
  FlowElement,
} from 'react-flow-renderer';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import { createElements } from './utils';
import { Service } from '../shared/interfaces';

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();

const initialElements: Elements = createElements();

const edgeTypes: EdgeTypesType = {
  floating: FloatingEdge,
};

const NodeAsHandleFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [elements, setElements] = useState<Elements>(initialElements);

  const onLoad = (_reactFlowInstance: any) =>
    setReactFlowInstance(_reactFlowInstance);

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els));

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
    
  const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
    
        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;
        const service: Service = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = 'input';
        const position = reactFlowInstance?.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode: FlowElement = {
          id: service.id.toString(),
          type,
          position,
          data: { label: `${service.name}` },
        };
    
        setElements((es) => es.concat(newNode));
      };

  return (
    <div className="react-flow-container floatingedges" ref={reactFlowWrapper}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;

// import React, { useState } from 'react';
// import ReactFlow, { Background, FlowElement, Position, updateEdge, addEdge } from 'react-flow-renderer';
// import FlowBlock from './FlowBlock';

// const initialElements: FlowElement[] = [
//   { id: '1', type: 'input', data: { label: <FlowBlock name='Web'/> }, position: { x: 25, y: 25 }, sourcePosition: Position.Right },
//   { id: '2', data: { label: <FlowBlock name='Queue'/> }, position: { x: 250, y: 25 }, sourcePosition: Position.Left, targetPosition: Position.Left },
//   { id: '3', data: { label: <FlowBlock name='Database'/> }, position: { x: 450, y: 25 }, sourcePosition: Position.Left, targetPosition: Position.Left },
//   { id: 'e1-2', source: '1', target: '2', animated: false },
//   { id: 'e2-3', source: '2', target: '3', animated: false }
// ];

// export function Flow() { 
//     const [elements, setElements] = useState(initialElements);

//     // gets called after end of edge gets dragged to another source or target
//     const onEdgeUpdate = (oldEdge: any, newConnection: any) => setElements((els) => updateEdge(oldEdge, newConnection, els));
//     const onConnect = (params: any) => setElements((els) => addEdge(params, els));

//     return ( 
//         <div className="react-flow-container">
//             <ReactFlow 
//                 elements={elements} 
//                 snapToGrid={true} 
//                 onEdgeUpdate={onEdgeUpdate}
//                 onConnect={onConnect}
//             >
//                 <Background />
//             </ReactFlow>
//         </div>
//     );
// }