import { useContext } from "react";
import { ClientListContext, ClientListUpdateContext } from "@/context/ClientListContext";

const useCart = () => {
  const clientList = useContext(ClientListContext);
  const { refreshClientList } = useContext(ClientListUpdateContext);

  return { clientList, refreshClientList };
};

export default useCart;
