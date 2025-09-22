export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatResponse {
  response: string;
}
