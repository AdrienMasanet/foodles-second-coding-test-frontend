import Head from "next/head";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import TopBar from "@/components/TopBar/TopBar";
import { AuthenticationProvider } from "@/context/AuthenticationContext";
import { CartProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  // This is a workaround for the self-signed certificate issue in development
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  } else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticationProvider>
        <CartProvider>
          <TopBar />
          <Component {...pageProps} />
        </CartProvider>
      </AuthenticationProvider>
    </>
  );
}
