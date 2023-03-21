import { useContext } from "react";
import { AuthenticationContext, AuthenticationUpdateContext } from "../context/AuthenticationContext";

const useAuthentication = () => {
  const loggedInClient = useContext(AuthenticationContext);
  const { login, logout, setNewCreditsAmount } = useContext(AuthenticationUpdateContext);

  return { loggedInClient, login, logout, setNewCreditsAmount };
};

export default useAuthentication;
