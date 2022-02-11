import React from 'react';
import { IService } from '../shared/interfaces';

function CLIContent(props: {selectedServices: IService[]}) {
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
                                <span className="comment"># No Azure CLI command for {service.name}</span>
                            )}
                        </div>
                    ))}
                </pre>
            )}
            {!selectedServices.length && (
                <div>No services selected</div>
            )}
        </>
    )
}

export default CLIContent;