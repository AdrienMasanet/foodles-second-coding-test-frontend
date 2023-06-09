import Head from "next/head";
import Image from "next/image";
import OpenShopButton from "@/components/OpenShopButton/OpenShopButton";
import { AuthenticationProvider } from "@/context/AuthenticationContext";
import { CartProvider } from "@/context/CartContext";
import { ClientListProvider } from "@/context/ClientListContext";

export default function HomePage() {
  return (
    <>
      <AuthenticationProvider>
        <CartProvider>
          <ClientListProvider>
            <main>
              <h1 className="text-center text-orange">Oups...</h1>
              <h2 className="text-center text-orange">Cette page n&apos;existe pas !</h2>
            </main>
          </ClientListProvider>
        </CartProvider>
      </AuthenticationProvider>
    </>
  );
}
