import React from 'react';
import Message from './Message';

type ChatBoxProps = {
  messages: { text: string; sender: 'user' | 'bot' }[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '24rem', overflowY: 'auto', padding: '0.5rem'}}>
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatBox;
