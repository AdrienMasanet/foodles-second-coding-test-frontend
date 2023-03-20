import styles from "./OpenShopButton.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { AuthenticationContext } from "@/context/AuthenticationContext";

/**
 * Displays a button to open the shop if a client is logged in.
 * If no client is logged in, displays an information message on how to log in.
 */
const OpenShopButton = () => {
  const loggedInClient = useContext(AuthenticationContext);

  return (
    <div className={styles.container}>
      {loggedInClient ? (
        <>
          Bonjour {loggedInClient.email} !
          <br />
          Il reste {loggedInClient.credits}€ sur votre compte.
          <Link href="/commander">
            <br />
            Cliquez ici pour faire quelques courses !
          </Link>
        </>
      ) : (
        <p className={styles.info}>Veuillez sélectionner un compte client avant d&apos;aller vous servir !</p>
      )}
    </div>
  );
};

export default OpenShopButton;
