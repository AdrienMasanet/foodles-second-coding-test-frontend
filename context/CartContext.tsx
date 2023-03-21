import { createContext, useState, useEffect } from "react";
import Product from "@/interfaces/Product";
import CartProduct from "@/interfaces/CartProduct";

export const CartContext = createContext<CartProduct[]>([]);
export const CartPriceContext = createContext<number>(0);
export const CartUpdateContext = createContext({
  addProduct: (product: Product): void => {},
  substractProduct: (product: Product): void => {},
  resetCart: (): void => {},
});

/**
 * Context provider for the cart state.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [price, setPrice] = useState<number>(0);

  const addProduct = (product: Product) => {
    setCart((cart: CartProduct[]) => {
      const newCart: CartProduct[] = [...cart];

      // Check if the product is already in the cart.
      const alreadyAddedProduct: CartProduct | undefined = cart.find((cartProduct) => cartProduct.id === product.id);

      if (alreadyAddedProduct) {
        // Early return the cart as it is if the product is already in the cart and the stock limit is reached.
        if (alreadyAddedProduct.stock < alreadyAddedProduct.quantity + 1) return newCart;
        alreadyAddedProduct.quantity++;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }

      // The products with 0 stock are not fetched from the API, so in any case, we need to update the price by adding the product price to the cart total price.
      setPrice((previousPrice: number) => Number((previousPrice + Number(product.price)).toFixed(2)));

      return newCart;
    });
  };

  const substractProduct = (product: Product) => {
    setCart((cart: CartProduct[]) => {
      const newCart: CartProduct[] = [...cart];

      const alreadyAddedProduct: CartProduct | undefined = cart.find((cartProduct) => cartProduct.id === product.id);

      if (alreadyAddedProduct) {
        if (alreadyAddedProduct.quantity > 1) {
          alreadyAddedProduct.quantity--;
        } else {
          newCart.splice(newCart.indexOf(alreadyAddedProduct), 1);
        }
        // In any way, we need to update the price by substracting the product price from the cart total price.
        setPrice((previousPrice: number) => Number((previousPrice - Number(product.price)).toFixed(2)));
      }

      return newCart;
    });
  };

  const resetCart = () => {
    setPrice(0);
    setCart([]);
  };

  return (
    <CartContext.Provider value={cart}>
      <CartPriceContext.Provider value={price}>
        <CartUpdateContext.Provider value={{ addProduct, substractProduct, resetCart }}>{children}</CartUpdateContext.Provider>
      </CartPriceContext.Provider>
    </CartContext.Provider>
  );
};
