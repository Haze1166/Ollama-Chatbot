
import '../styles/globals.css';
import '../styles/chat.css';

// ...existing code...
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
