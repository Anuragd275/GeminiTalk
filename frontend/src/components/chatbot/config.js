import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './BotAvatar';
import CustomResponseComponent from './CustomResponseComponent';

const config = {
    initialMessages: [
        createChatBotMessage('Welcome to GeminiTalk! Ask me anything...'),
    ],
    botName: 'Assistant',
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props} />,
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#376B7E',
        },
    },
    widgets: [
        {
            widgetName: 'customResponse',
            widgetFunc: (props) => <CustomResponseComponent {...props} />,
            mapStateToProps: ['messages'],
        },
    ],
};

export default config;