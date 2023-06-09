import { createContext, useState, useEffect } from "react";
import ConnectedClient from "@/interfaces/ConnectedClient";
import getLoggedInClient from "@/services/clients/getLoggedInClient";

export const AuthenticationContext = createContext<ConnectedClient | null>(null);
export const AuthenticationUpdateContext = createContext({
  login: (loggedInClient: ConnectedClient): void => {},
  logout: (): void => {},
  setNewCreditsAmount: (newAmount: number): void => {},
});

/**
 * Context provider for the authentication state.
 * login function is used to set the current logged in client by calling the API which returns the client's data and a HTTPOnly cookie containing the session ID.
 * logout function is used to remove the current logged in client state (It currently doesn't remove the session ID cookie as the API doesn't support it yet).
 * setNewCreditsAmount function is used to change the credits amount of the current logged in client.
 */
export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInClient, setUser] = useState<ConnectedClient | null>(null);

  const login = (loggedInClient: ConnectedClient) => {
    setUser(loggedInClient);
  };

  const logout = () => {
    setUser(null);
  };

  // Change the credits amount of the current logged in client
  const setNewCreditsAmount = (newAmount: number) => {
    if (loggedInClient) {
      setUser({ ...loggedInClient, credits: newAmount });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInClient = await getLoggedInClient();
      setUser(loggedInClient);
    };
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={loggedInClient}>
      <AuthenticationUpdateContext.Provider value={{ login, logout, setNewCreditsAmount }}>{children}</AuthenticationUpdateContext.Provider>
    </AuthenticationContext.Provider>
  );
};
