import { createContext, useState, useEffect } from "react";
import ConnectedClient from "@/interfaces/ConnectedClient";
import getLoggedInClient from "@/services/clients/getLoggedInClient";

export const AuthenticationContext = createContext<ConnectedClient | null>(null);
export const AuthenticationUpdateContext = createContext({
  login: (user: ConnectedClient): void => {},
  logout: (): void => {},
});

/**
 * Context provider for the authentication state.
 */
export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ConnectedClient | null>(null);

  const login = (user: ConnectedClient) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInClient();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={user}>
      <AuthenticationUpdateContext.Provider value={{ login, logout }}>{children}</AuthenticationUpdateContext.Provider>
    </AuthenticationContext.Provider>
  );
};
