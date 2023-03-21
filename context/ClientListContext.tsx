import Client from "@/interfaces/Client";
import getClients from "@/services/clients/getClients";
import { createContext, useState, useEffect } from "react";

export const ClientListContext = createContext<Client[]>([]);
export const ClientListUpdateContext = createContext({
  refreshClientList: (): void => {},
});

/**
 * Context provider for the client list state.
 * The refreshClientList function is used to refresh the client list by calling the API
 */
export const ClientListProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientList, setClientList] = useState<Client[]>([]);

  const refreshClientList = async () => {
    const clients = await getClients();
    setClientList(clients);
  };

  useEffect(() => {
    refreshClientList();
  }, []);

  return (
    <ClientListContext.Provider value={clientList}>
      <ClientListUpdateContext.Provider value={{ refreshClientList }}>{children}</ClientListUpdateContext.Provider>
    </ClientListContext.Provider>
  );
};
