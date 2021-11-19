import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "components/Header";
import { AuthProvider, MojitoApiProvider } from "state";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mojito</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <MojitoApiProvider>
          <Header />
          <Component {...pageProps} />
        </MojitoApiProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
