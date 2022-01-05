import type { AppProps } from "next/app";
import Head from "next/head";
import fetch from "node-fetch";
import { abortableFetch } from "abortcontroller-polyfill/dist/cjs-ponyfill";
import { ThemeProvider } from "styled-components";

import { Header, Footer } from "@components";
import { AuthProvider, MojitoApiProvider } from "@state";
import { GlobalStyles } from "@theme/GlobalStyles";
import { theme } from "@theme/theme";

global.fetch = abortableFetch(fetch).fetch;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Metaverso</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <MojitoApiProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </MojitoApiProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
