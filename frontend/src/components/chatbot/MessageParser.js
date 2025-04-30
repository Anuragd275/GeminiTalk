class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        // We'll simply pass all messages to our Flask API
        this.actionProvider.handleApiRequest(message);
    }
}

export default MessageParser;