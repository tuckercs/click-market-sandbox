import type { AppProps } from "next/app";
import Head from "next/head";
import fetch from "node-fetch";
import Image from "next/image";
import { abortableFetch } from "abortcontroller-polyfill/dist/cjs-ponyfill";
import Header from "components/Header";
import Footer from "components/Footer";
import { AuthProvider, MojitoApiProvider } from "state";
import "styles/globals.css";

global.fetch = abortableFetch(fetch).fetch;

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
          <Footer/>
        </MojitoApiProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
