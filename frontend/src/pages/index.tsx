

import { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';
import AuthBox from '../components/AuthBox';
import { sendMessage, getHistory } from '../utils/api';

const IndexPage = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Load chat history when token is set
  useEffect(() => {
    if (token) {
      getHistory(token).then(history => {
        // history is array of {sender, text}
        setMessages(history);
      });
    }
  }, [token]);

  const handleSend = async (input: string) => {
    if (!input.trim() || !token) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setIsTyping(true);
    try {
      const res = await sendMessage(input, token);
      setMessages(prev => [...prev, { text: res.response, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Error: Could not get response', sender: 'bot' }]);
    }
    setIsTyping(false);
  };

  if (!token) {
    return <AuthBox onAuth={setToken} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="chat-container flex flex-col gap-4">
        <div className="chat-header">Ollama Chatbot</div>
        <ChatBox messages={messages} />
        {isTyping && <div className="typing-indicator">Bot is typing...</div>}
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default IndexPage;
