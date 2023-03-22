import styles from "./ClientInformations.module.scss";
import ConnectedClient from "@/interfaces/ConnectedClient";

type ClientInformationsProps = {
  client: ConnectedClient;
};

/*
 * Displays logged in client personal informations.
 */
const ClientInformations = ({ client }: ClientInformationsProps) => {
  return (
    <div className={styles.container}>
      <p>
        <span>Nom :</span>&nbsp;
        {client.name}
      </p>
      <p>
        <span>Addresse-email :</span>&nbsp;
        {client.email}
      </p>
      <p>
        <span>Crédits restants :</span>&nbsp;
        {client.credits} €
      </p>
      <p>
        <span>Date de création du compte :</span>&nbsp;
        {new Date(client.createdAt).toLocaleDateString("fr-FR")} à {new Date(client.createdAt).toLocaleTimeString("fr-FR")}
      </p>
      <p>
        <span>Dernière modification :</span>&nbsp;
        {new Date(client.updatedAt).toLocaleDateString("fr-FR")} à {new Date(client.updatedAt).toLocaleTimeString("fr-FR")}
      </p>
    </div>
  );
};

export default ClientInformations;
