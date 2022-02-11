import React from 'react';
import { IDocument, ILearnContent, IService } from 'shared/interfaces';

export default function LearnContent(props: { selectedServices: IService[] }) {
    const { selectedServices } = props;

    return (
        <>
            {selectedServices.length > 0 && selectedServices.map((service: IService) => (
                <div key={service.name}>
                    {service.learnContent && (
                        <div className="list">
                            <div className="image-title-container mb-10 bg-light-gray">
                                <span className="bg-main">
                                    <img src={service.image ? `/images/${service.image}` : '/images/microsoft-docs.svg'}
                                        alt={`Microsoft Docs for ${service.name}`} className="microsoft-image" />
                                </span>
                                <span className="docs-learn-title">{service.name}</span>
                            </div>
                            <ul>
                                {service.learnContent && service.learnContent.map((learnContent: ILearnContent) => (
                                    <li key={learnContent.name}>
                                        <div className="image-title-container mb-10">
                                            <img src={learnContent.image ? learnContent.image : 'https://docs.microsoft.com/learn/achievements/generic-trophy.svg'}
                                                alt={learnContent.name} className="microsoft-image" />
                                            <a href={learnContent.url} target="_blank" rel="noopener noreferrer" className="docs-learn-title">{learnContent.name}</a>
                                        </div>

                                        {learnContent.modules && (
                                            <ol>
                                                {learnContent.modules && learnContent.modules.map((module: IDocument) => (
                                                    <li key={module.name}>
                                                        <a href={module.url} target="_blank" rel="noopener noreferrer">{module.name}</a>
                                                    </li>
                                                ))}
                                            </ol>
                                        )}

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
    );
}