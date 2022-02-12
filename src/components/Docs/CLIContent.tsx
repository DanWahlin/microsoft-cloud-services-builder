import React from 'react';
import { IService } from 'shared/interfaces';

export default function CLIContent(props: {selectedServices: IService[]}) {
    const { selectedServices } = props;

    return (
        <>
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
                                <span className="comment"></span>
                            )}
                        </div>
                    ))}
                </pre>
            )}
            {!selectedServices.length && (
                <div>No services selected</div>
            )}
        </>
    );
}