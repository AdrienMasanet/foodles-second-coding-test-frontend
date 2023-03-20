import Head from "next/head";
import Image from "next/image";
import Product from "@/interfaces/Product";
import getProducts from "@/services/products/getProducts";
import ProductList from "@/components/ProductList/ProductList";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthenticationContext } from "@/context/AuthenticationContext";

type ShopPageProps = {
  products: Product[];
};

export default function ShopPage({ products }: ShopPageProps) {
  const loggedInClient = useContext(AuthenticationContext);
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
      <main>
        <h1 className="text-center text-orange">Commander</h1>
        <hr />
        <ProductList products={products} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
  };
}
