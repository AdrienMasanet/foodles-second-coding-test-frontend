import styles from "./OpenShopButton.module.scss";
import useAuthentication from "@/hooks/useAuthentication";
import Link from "next/link";

/**
 * Displays a button to open the shop if a client is logged in.
 * If no client is logged in, displays an information message on how to log in.
 */
const OpenShopButton = () => {
  const { loggedInClient } = useAuthentication();

  return (
    <div className={styles.container}>
      {loggedInClient ? (
        <>
          Bonjour {loggedInClient.name} !
          <br />
          {loggedInClient.credits > 0 ? (
            <>
              Il reste {loggedInClient.credits}€ sur votre compte.
              <Link href="/commander">
                <br />
                Cliquez ici pour faire quelques courses !
              </Link>
            </>
          ) : (
            <>Vous n&apos;avez plus de crédits...</>
          )}
        </>
      ) : (
        <p className={styles.info}>Veuillez sélectionner un compte client avant d&apos;aller vous servir !</p>
      )}
    </div>
  );
};

export default OpenShopButton;
