import React from 'react';

type MessageProps = {
  text: string;
  sender: 'user' | 'bot';
};

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  const isUser = sender === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>{text}</div>
    </div>
  );
};

export default Message;
