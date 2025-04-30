import axios from 'axios';

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // Add a loading message to show while waiting for API response
    addLoadingMessage = () => {
        const message = this.createChatBotMessage("...", {
            loading: true,
            delay: 500,
        });

        this.addMessageToState(message);
        return message;
    };

    // Remove loading message when response is received
    removeLoadingMessage = (loadingMessage) => {
        this.setState((prev) => ({
            ...prev,
            messages: prev.messages.filter((msg) => msg !== loadingMessage),
        }));
    };

    // Add message to chatbot state
    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };

    handleButtonClick = (value) => {
        // Create a new user message showing what button was clicked
        const userMessage = this.createClientMessage(value);
        this.addMessageToState(userMessage);

        // Process the button click as a new message
        this.handleApiRequest(value);
    };

    // Modify the existing handleApiRequest method to handle structured responses
    handleApiRequest = async (message) => {
        const loadingMessage = this.addLoadingMessage();

        try {
            const response = await axios.post('http://127.0.0.1:5000/chat', {
                user_text: message
            });

            this.removeLoadingMessage(loadingMessage);

            if (response.data && typeof response.data === 'object') {
                if (response.data.type) {
                    const botMessage = this.createChatBotMessage('', {
                        widget: 'customResponse',
                        payload: response.data
                    });
                    this.addMessageToState(botMessage);
                } else if (response.data.message) {
                    const botMessage = this.createChatBotMessage(response.data.message);
                    this.addMessageToState(botMessage);
                } else {
                    const botMessage = this.createChatBotMessage(JSON.stringify(response.data));
                    this.addMessageToState(botMessage);
                }
            } else {
                const botMessage = this.createChatBotMessage(response.data);
                this.addMessageToState(botMessage);
            }
        } catch (error) {
            console.error('Error calling API:', error);
            this.removeLoadingMessage(loadingMessage);
            const errorMessage = this.createChatBotMessage("Sorry, I'm having trouble connecting to the server.");
            this.addMessageToState(errorMessage);
        }
    };


}

export default ActionProvider;

