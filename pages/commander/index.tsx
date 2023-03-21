import Product from "@/interfaces/Product";
import getProducts from "@/services/products/getProducts";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthentication from "@/hooks/useAuthentication";
import Head from "next/head";
import ProductList from "@/components/ProductList/ProductList";
import { ProductListProvider } from "@/context/ProductListContext";

type ShopPageProps = {
  products: Product[];
};

export default function ShopPage({ products }: ShopPageProps) {
  const { loggedInClient } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInClient) {
      router.push("/");
    }
  }, [loggedInClient, router]);

  return (
    <>
      <Head>
        <title>Foodles | Commander</title>
        <meta name="description" content="Une petite faim ? Commandez vos plats préférés en quelques clics ! Nos produits sont de qualité, frais et préparés avec le plus grand soin. Nos circuits courts vous garantissent des produits de saison biologiques et locaux et le respect de l'environnement est au cœur de notre démarche." />
      </Head>
      <ProductListProvider>
        <main>
          <h1 className="text-center text-orange">Commander</h1>
          <hr />
          <ProductList />
        </main>
      </ProductListProvider>
    </>
  );
}
