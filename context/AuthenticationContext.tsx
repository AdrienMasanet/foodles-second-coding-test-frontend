import { createContext, useState, useEffect } from "react";
import ConnectedClient from "@/interfaces/ConnectedClient";
import getLoggedInClient from "@/services/clients/getLoggedInClient";

export const AuthenticationContext = createContext<ConnectedClient | null>(null);
export const AuthenticationUpdateContext = createContext({
  login: (loggedInClient: ConnectedClient): void => {},
  logout: (): void => {},
});

/**
 * Context provider for the authentication state.
 */
export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInClient, setUser] = useState<ConnectedClient | null>(null);

  const login = (loggedInClient: ConnectedClient) => {
    setUser(loggedInClient);
  };

  const logout = () => {
    setUser(null);
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
      <AuthenticationUpdateContext.Provider value={{ login, logout }}>{children}</AuthenticationUpdateContext.Provider>
    </AuthenticationContext.Provider>
  );
};
