// Example in api.ts
export async function sendMessage(message: string, token: string) {
  const res = await fetch('http://127.0.0.1:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export async function getHistory(token: string) {
  const res = await fetch('http://127.0.0.1:8000/history', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
}