import styles from "./ClientSwitcher.module.scss";
import Client from "@/interfaces/Client";
import ConnectedClient from "@/interfaces/ConnectedClient";
import loginClient from "@/services/clients/loginClient";
import { useState, useEffect, useRef, useCallback } from "react";
import useClientList from "@/hooks/useClientList";
import useAuthentication from "@/hooks/useAuthentication";
import useCart from "@/hooks/useCart";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

/**
 * Displays a dropdown list of available clients and logs in the selected client.
 */
const ClientSwitcher = () => {
  const { clientList } = useClientList();
  const { loggedInClient, login } = useAuthentication();
  const { resetCart } = useCart();
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const arrowButtonRef = useRef<HTMLInputElement>(null);
  const [clientsSearchResults, setClientsSearchResults] = useState<Client[] | null>(null);

  // Search clients by name or email in the clients state which is set at first render and contains all available clients
  const searchClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;

    // If the search input is empty, set the results state to the clients state to display all available clients
    if (!search) {
      setClientsSearchResults(clientList);
      return;
    }

    // Filter clients by name and email to set the results state, lowercase both strings to avoid case sensitivity
    setClientsSearchResults(clientList.filter((client) => client.email.toLowerCase().includes(search.toLowerCase()) || client.name.toLowerCase().includes(search.toLowerCase())));
  };

  /* Avoid cumulating onClick listeners by using event delegation and handle the click outside of the component
   * Use the useCallback hook to avoid triggering the useEffect hook just below this function on every render */
  const selectClient = useCallback(
    (event: MouseEvent) => {
      if (event.target !== inputFieldRef.current) setClientsSearchResults(null);

      const clientId = (event.target as HTMLDivElement).getAttribute("data-client-id");

      if (!clientId) return;

      /* Call the API to assign the HTTPOnly cookie to the browser
       * then set the AuthenticationContext to the logged in client returned by the API
       * and don't forget to reset the cart (new client logged in = new blank cart) */
      loginClient(clientId).then((client) => {
        login(client as ConnectedClient);
        resetCart();
      });
    },
    [login, resetCart]
  );

  // Handle click event globally in the document to be able to close the dropdown list if the user clicks outside of it
  useEffect(() => {
    document.addEventListener("click", selectClient);
    return () => {
      document.removeEventListener("click", selectClient);
    };
  }, [selectClient]);

  // If a client is logged in, set the default select value of the input field to the logged in client
  useEffect(() => {
    if (loggedInClient) {
      inputFieldRef.current!.value = loggedInClient.name + " | " + loggedInClient.email + " | " + loggedInClient.credits + " €";
    }
  }, [loggedInClient]);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input type="text" ref={inputFieldRef} placeholder="Choisissez un compte client" autoComplete="false" defaultValue={loggedInClient ? loggedInClient.name + " | " + loggedInClient.email + " | " + loggedInClient.credits + " €" : ""} onChange={searchClient} />
        <div className={styles.arrowbutton} ref={arrowButtonRef} title="Afficher tous les clients disponibles">
          <ChevronDownIcon
            onClick={(event) => {
              event.stopPropagation(); // Avoid triggering the click event listener on the document which would close the dropdown list
              setClientsSearchResults(clientsSearchResults ? null : clientList); // Toggle the dropdown list
            }}
          />
        </div>
      </div>
      <div className={styles.results}>
        {clientsSearchResults &&
          clientsSearchResults.map((client) => (
            <div key={client.id} className={styles.result} data-client-id={client.id}>
              {client.name} | {client.email} | {client.credits}€
            </div>
          ))}
        {clientsSearchResults && clientsSearchResults.length === 0 && <div className={`${styles.result} ${styles.disabled}`}>Aucun résultat</div>}
      </div>
    </div>
  );
};

export default ClientSwitcher;
