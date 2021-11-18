import type { AppProps } from "next/app";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "components/Header";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mojito</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
