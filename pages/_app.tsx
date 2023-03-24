import Head from "next/head";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import TopBar from "@/components/TopBar/TopBar";
import { AuthenticationProvider } from "@/context/AuthenticationContext";
import { CartProvider } from "@/context/CartContext";
import { ClientListProvider } from "@/context/ClientListContext";
import { ProductListProvider } from "@/context/ProductListContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticationProvider>
        <CartProvider>
          <ClientListProvider>
            <ProductListProvider>
              <TopBar />
              <Component {...pageProps} />
            </ProductListProvider>
          </ClientListProvider>
        </CartProvider>
      </AuthenticationProvider>
    </>
  );
}
