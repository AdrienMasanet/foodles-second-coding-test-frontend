import { useContext } from "react";
import { CartContext, CartPriceContext, CartUpdateContext } from "../context/CartContext";

const useCart = () => {
  const cart = useContext(CartContext);
  const price = useContext(CartPriceContext);
  const { addProduct, subtractProduct, resetCart } = useContext(CartUpdateContext);

  return { cart, price, addProduct, subtractProduct, resetCart };
};

export default useCart;
