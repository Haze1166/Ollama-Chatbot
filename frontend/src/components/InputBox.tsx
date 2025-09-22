import { useState } from 'react';

export default function InputBox({ onSend }: { onSend: (input: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <form className="input-row" onSubmit={handleSubmit}>
      <input
        className="input-box"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="send-btn" type="submit">
        Send
      </button>
    </form>
  );
}
