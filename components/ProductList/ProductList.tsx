import Image from "next/image";
import Product from "@/interfaces/Product";
import styles from "./ProductList.module.scss";
import ProductListItem from "./ProductListItem";
import useProductList from "@/hooks/useProductList";

/**
 * Displays a list of products (passed in props) in a grid containing an automatic number of columns depending on the viewport width.
 */
const ProductList = () => {
  const { productList } = useProductList();

  return (
    <>
      {productList.length === 0 && <p className="text-center text-orange">Aucun produit en stock actuellement...</p>}
      <div className={styles.container}>{productList.length > 0 && productList.map((product) => <ProductListItem key={product.id} product={product} />)}</div>
    </>
  );
};

export default ProductList;
