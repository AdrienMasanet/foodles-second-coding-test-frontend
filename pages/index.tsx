import Head from "next/head";
import Image from "next/image";
import OpenShopButton from "@/components/OpenShopButton/OpenShopButton";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Foodles</title>
        <meta name="description" content="Bienvenue sur le site de Foodles où vous pourrez commander en toute simplicité des plats en tout genre pour vous régaler rapidement ! Nos produits sont de qualité, frais et préparés avec le plus grand soin. Nos circuits courts vous garantissent des produits de saison biologiques et locaux et le respect de l'environnement est au cœur de notre démarche." />
      </Head>
      <main>
        <OpenShopButton />
      </main>
    </>
  );
}
