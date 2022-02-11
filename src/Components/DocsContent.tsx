import React from 'react';
import { IDocument, IService } from '../shared/interfaces';

function DocsContent(props: {selectedServices: IService[]}) {
    const { selectedServices } = props;
    
    return (
        <>
            {selectedServices.length > 0 && selectedServices.map((service: IService) => (
                <div key={service.name} className="list">
                    {service.documents && (
                    <div>
                    <div className="image-title-container mb-10 bg-light-gray">
                        <span className="bg-main">
                            <img src={service.image ? `/images/${service.image}` : '/images/microsoft-docs.svg'}
                                alt={`Microsoft Docs for ${service.name}`} className="microsoft-image" />
                        </span>
                        <span className="docs-learn-title">{service.name} Docs</span>
                    </div>
                    <ul>
                        {service.documents && service.documents.length > 0 && service.documents.map((document: IDocument) => (
                            <li key={document.name}>
                                <a href={document.url} target="_blank" rel="noopener noreferrer">{document.name}</a>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
                    )}
                </div>
            ))}
            {!selectedServices.length && (
                <div>No services selected</div>
            )}
        </>
    )
}

export default DocsContent;