import React from 'react';

const CustomResponseComponent = (props) => {
    const { response } = props;

    // If your API returns different types of responses,
    // you can handle them differently here
    switch (response.type) {
        case 'text':
            return <p>{response.text}</p>;

        case 'link':
            return (
                <div>
                    <p>{response.text}</p>
                    <a href={response.url} target="_blank" rel="noopener noreferrer">
                        {response.linkText}
                    </a>
                </div>
            );

        case 'buttons':
            return (
                <div>
                    <p>{response.text}</p>
                    <div className="button-container">
                        {response.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => props.actionProvider.handleButtonClick(option.value)}
                                className="option-button"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            );

        default:
            return <p>{response.text || JSON.stringify(response)}</p>;
    }
};

export default CustomResponseComponent;