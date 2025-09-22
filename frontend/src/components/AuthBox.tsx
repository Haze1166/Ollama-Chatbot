import { useState } from 'react';

export default function AuthBox({ onAuth }: { onAuth: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const url = mode === 'login' ? 'http://127.0.0.1:8000/login' : 'http://127.0.0.1:8000/register';
    const body = mode === 'login'
      ? new URLSearchParams({ username, password })
      : JSON.stringify({ username, password });
    const headers = mode === 'login'
      ? { 'Content-Type': 'application/x-www-form-urlencoded' }
      : { 'Content-Type': 'application/json' };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
      const data = await res.json();
      if (data.access_token) {
        onAuth(data.access_token);
      } else {
        setError(data.detail || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="chat-container flex flex-col gap-4">
      <h2 className="chat-header">Login / Register</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input className="input-box" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="input-box" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button className="send-btn" type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" className="send-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
