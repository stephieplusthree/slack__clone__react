import React from 'react';
import MessageHeader from './MessageHeader/MessageHeader.component';
import MessageInput from './MessageInput/MessageInput.component';
import MessageContent from './MessageContent/MessageContent.component';

const Messages = () => {
    return (
        <div>
            <MessageHeader />
            <MessageInput />
        </div>
    )
}

export default Messages;
