import Product from "@/interfaces/Product";
import getProducts from "@/services/products/getProducts";
import { createContext, useState, useEffect } from "react";

export const ProductListContext = createContext<Product[]>([]);
export const ProductListUpdateContext = createContext({
  refreshProductList: (): void => {},
});

/**
 * Context provider for the product list state.
 * The refreshProductList function is used to refresh the product list by calling the API.
 */
export const ProductListProvider = ({ children }: { children: React.ReactNode }) => {
  const [productList, setProductList] = useState<Product[]>([]);

  const refreshProductList = async () => {
    const refreshedProducts = await getProducts();
    setProductList(refreshedProducts);
  };

  useEffect(() => {
    refreshProductList();
  }, []);

  return (
    <ProductListContext.Provider value={productList}>
      <ProductListUpdateContext.Provider value={{ refreshProductList }}>{children}</ProductListUpdateContext.Provider>
    </ProductListContext.Provider>
  );
};
