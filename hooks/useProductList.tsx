import { useContext } from "react";
import { ProductListContext, ProductListUpdateContext } from "@/context/ProductListContext";

const useProductList = () => {
  const productList = useContext(ProductListContext);
  const { refreshProductList } = useContext(ProductListUpdateContext);

  return { productList, refreshProductList };
};

export default useProductList;
