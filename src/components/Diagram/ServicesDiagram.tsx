import React, { useEffect, useRef, useState } from 'react';

import ReactFlow, {
    removeElements,
    addEdge,
    // Background,
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
import { createElements } from './diagramUtils';
import { IService } from 'shared/interfaces';
import CloudBlock from 'components/CloudServices/CloudBlock';
import { servicesAtom } from 'atoms/servicesAtom';
import { useSetRecoilState } from 'recoil';

const initialElements: Elements = createElements();

const edgeTypes: EdgeTypesType = {
    floating: FloatingEdge,
};

export default function ServicesDiagram(){
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [elements, setElements] = useState<Elements>(initialElements);
    // useRef needed since using useState() creates stale closure issue due to keydown binding
    const services = useRef<IService[]>([]);
    const selectedElement = useRef<Node | Edge>();
    const setServices = useSetRecoilState(servicesAtom);

    function deleteSelectedElement(key: string) { 
        const currentSelectedElement = selectedElement.current;
        if (key === 'Delete' && currentSelectedElement) {
            //eslint-disable-next-line
            removeService(currentSelectedElement);
        }
    }

    function removeService(currentSelectedElement: Node<any> | Edge<any>) {
        const edges = elements.filter((element: Node | Edge) => isEdge(currentSelectedElement)) as Edge[];
        const edgesToRemove = getConnectedEdges([currentSelectedElement as Node], edges);
        onElementsRemove([currentSelectedElement, ...edgesToRemove]);
        removeServices([currentSelectedElement as Node]);
    }

    function removeServices(removedSvcs: Node[]) {
        const removedSvcNames = removedSvcs.map(svc => svc.id);
        services.current = services.current.filter(svc => !removedSvcNames.includes(svc.name));
        setServices(services.current);
    }

    function onKeyDown(event: KeyboardEvent) {
        deleteSelectedElement(event.key);
    } 

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        // Clean up
        return () => document.addEventListener('keydown', onKeyDown);
  }, []); // eslint-disable-line

    function onLoad(_reactFlowInstance: any) {
        setReactFlowInstance(_reactFlowInstance);
        _reactFlowInstance.fitView();
    }

    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

    function onConnect(params: Connection | Edge) {
        setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els));
    }

    function onDragOver(event: React.DragEvent) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }
   
    function onDrop(event: React.DragEvent){
        const data = event.dataTransfer.getData('application/reactflow');
        if (data) {
            const service: IService = JSON.parse(data);

            // Make sure they haven't already added the service
            if (services.current.findIndex(svc => svc.name === service.name) > -1) {
                return;
            }

            // Track newly dropped service (drives docs/learn/cli display)
            services.current = services.current.concat(service);
            setServices(services.current);

            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;
            const position = reactFlowInstance?.project({
                x: (event.clientX - reactFlowBounds.left) - 120,
                y: (event.clientY - reactFlowBounds.top) - 40,
            });

            const newNode: FlowElement = {
                id: service.name,
                position,
                className: service.cssClass,
                sourcePosition: Position.Left,
                targetPosition: Position.Right,
                data: { 
                    label: <CloudBlock name={service.name} 
                        description={service.description} 
                        image={service.image} 
                        showDeleteButton={true} 
                        deleteService={deleteSelectedElement} /> 
                }
            };
      
            setElements((es) => es.concat(newNode));
            event.preventDefault();
        }
    }

    function onElementClick(event: React.MouseEvent, element: Node | Edge) {
        selectedElement.current = element;
        console.log(selectedElement.current);
    }

    return (
        <>
            <div className="heading">Selected Cloud Services</div>
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
                    defaultZoom={1.3}
                    zoomOnScroll={false}
                >
                    {/* <Background size={0.5} /> */}
                </ReactFlow>
            </div>
        </>
    );
}