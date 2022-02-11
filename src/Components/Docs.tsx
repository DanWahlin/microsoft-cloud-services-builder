import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { servicesAtom } from '../Atoms/servicesAtom';
import { ILearnContent, IDocument, IService, ILearnModule } from '../shared/interfaces';
import TabPanel from './TabPanel';

function Docs(props: any) {
    const [value, setValue] = useState(0);
    const selectedServices = useRecoilValue<IService[]>(servicesAtom);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="heading">Docs and Learn Content</div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Docs" />
                    <Tab label="Microsoft Learn" />
                    <Tab label="Azure CLI" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
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
                                                    {learnContent.modules && learnContent.modules.map((module: ILearnModule) => (
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
            </TabPanel>
            <TabPanel value={value} index={2}>
                {selectedServices.length > 0 && (
                    <pre className="console">
                        {selectedServices.map((service: IService) => (
                            <div key={service.name}>
                                {service.azureCLICommand && (
                                    <div className="azure-cli-command">
                                        <span className="comment"># {service.name}</span>
                                        <br />
                                        {service.azureCLICommand.join('\n')}
                                    </div>
                                )}
                                {!service.azureCLICommand && (
                                    <span className="comment"># No Azure CLI command for {service.name}</span>
                                )}
                            </div>
                        ))}
                    </pre>
                )}
                {!selectedServices.length && (
                    <div>No services selected</div>
                )}
            </TabPanel>
        </>
    );
}

export default Docs;