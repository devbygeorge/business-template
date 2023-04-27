/* Next assets import */
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

/* Global styles import */
import "@/styles/globals.css";

/* Components import */
import Header from "@/components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Company Business Template</title>
        <link rel="icon" href="/images/logo.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
