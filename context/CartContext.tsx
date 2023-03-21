import { createContext, useState } from "react";
import Product from "@/interfaces/Product";

export const CartContext = createContext<{ [key: string]: number }>({});
export const CartPriceContext = createContext<number>(0);
export const CartUpdateContext = createContext({
  addProduct: (product: Product): void => {},
  subtractProduct: (product: Product): void => {},
  resetCart: (): void => {},
});

/**
 * Context provider for the cart state, with the product ID as key and the quantity as value.
 * Price is updated when a product is added or removed from the cart.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [price, setPrice] = useState<number>(0);

  const addProduct = (product: Product) => {
    setCart((cart) => {
      const newCart = { ...cart };

      // Check if the product is already in the cart. If so, increase the quantity by 1.
      if (product.id in newCart) {
        newCart[product.id]++;
      } else {
        newCart[product.id] = 1;
      }

      // The products with 0 stock are not fetched from the API, so in any case, we need to update the price by adding the product price to the cart total price.
      setPrice((previousPrice: number) => Number((previousPrice + Number(product.price)).toFixed(2)));

      return newCart;
    });
  };

  const subtractProduct = (product: Product) => {
    setCart((cart) => {
      const newCart = { ...cart };

      if (product.id in newCart) {
        if (newCart[product.id] > 1) {
          newCart[product.id]--;
        } else {
          delete newCart[product.id];
        }

        // In any way, we need to update the price by substracting the product price from the cart total price stored in price state.
        setPrice((previousPrice: number) => Number((previousPrice - Number(product.price)).toFixed(2)));
      }

      return newCart;
    });
  };

  // Reset the cart state and the price state.
  const resetCart = () => {
    setPrice(0);
    setCart({});
  };

  return (
    <CartContext.Provider value={cart}>
      <CartPriceContext.Provider value={price}>
        <CartUpdateContext.Provider value={{ addProduct, subtractProduct, resetCart }}>{children}</CartUpdateContext.Provider>
      </CartPriceContext.Provider>
    </CartContext.Provider>
  );
};
