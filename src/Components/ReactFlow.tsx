import React, { useEffect, useRef, useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  EdgeTypesType,
  Elements,
  Connection,
  Edge,
  Node,
  ArrowHeadType,
  FlowElement,
  Position,
  isEdge,
  getConnectedEdges
} from 'react-flow-renderer';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import { createElements } from './utils';
import { IService } from '../shared/interfaces';
import CloudBlock from './CloudBlock';

const initialElements: Elements = createElements();

const edgeTypes: EdgeTypesType = {
  floating: FloatingEdge,
};

const NodeAsHandleFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [elements, setElements] = useState<Elements>(initialElements);
  // useRef needed since using useState() creates stale closure issue due to keydown binding
  const selectedElement = useRef<Node | Edge>();

  const onLoad = (_reactFlowInstance: any) => {
    setReactFlowInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    // Clean up
    return () => document.addEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = (event: KeyboardEvent) => {
    const currentSelectedElement = selectedElement.current;
    if (event.key === 'Delete' && currentSelectedElement) {
      const edges = elements.filter((element: Node | Edge) => isEdge(currentSelectedElement)) as Edge[];
      const edgesToRemove = getConnectedEdges([currentSelectedElement as Node], edges);
      onElementsRemove([currentSelectedElement, ...edgesToRemove]);
    }
  };

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els));

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
    
  const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('application/reactflow');
        if (data) {
          const service: IService = JSON.parse(data);
          const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;
          const position = reactFlowInstance?.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode: FlowElement = {
            id: service.name,
            // type: 'input',
            position,
            className: service.cssClass,
            targetPosition: Position.Right,
            data: { label: <CloudBlock name={service.name} description={service.desciption} image={service.image} /> }
          };
      
          setElements((es) => es.concat(newNode));
        }
  };

  const onElementClick = (event: React.MouseEvent, element: Node | Edge) => {
    selectedElement.current = element;
  };

  return (
    <div className="react-flow-container floatingedges" ref={reactFlowWrapper}>
      <ReactFlow
        elements={elements}
        snapToGrid
        onElementClick={onElementClick}
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