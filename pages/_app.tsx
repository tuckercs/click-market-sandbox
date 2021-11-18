
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Header from 'components/Header';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
