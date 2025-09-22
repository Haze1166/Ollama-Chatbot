// Next.js API route (if not using FastAPI)
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Call Ollama backend here
    res.status(200).json({ response: 'Hello from Ollama!' });
  } else {
    res.status(405).end();
  }
}
