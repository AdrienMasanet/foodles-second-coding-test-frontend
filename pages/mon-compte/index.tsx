import Head from "next/head";
import ClientInformations from "@/components/ClientInformations/ClientInformations";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthenticationContext } from "@/context/AuthenticationContext";

export default function AccountPage() {
  const loggedInClient = useContext(AuthenticationContext);
  const router = useRouter();

  // If the user is not logged in, do not display the page and redirect to the home page.
  useEffect(() => {
    if (!loggedInClient) {
      router.push("/");
    }
  }, [loggedInClient, router]);

  return (
    <>
      <Head>
        <title>Foodles | Mon compte</title>
      </Head>
      <main>
        <h1 className="text-center text-orange">Mon compte</h1>
        <hr />
        <section>{loggedInClient && <ClientInformations client={loggedInClient} />}</section>
      </main>
    </>
  );
}
