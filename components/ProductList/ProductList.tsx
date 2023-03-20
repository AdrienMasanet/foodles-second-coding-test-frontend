import Image from "next/image";
import Product from "@/interfaces/Product";
import styles from "./ProductList.module.scss";
import ProductListItem from "./ProductListItem";

type ProductListProps = {
  products: Product[];
};

/**
 * Displays a list of products (passed in props) in a grid containing an automatic number of columns depending on the viewport width.
 */
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={styles.container}>
      {products.length > 0 && products.map((product) => <ProductListItem key={product.id} product={product} />)}
      {products.length === 0 && <p className="text-center text-orange">Aucun produit en stock actuellement...</p>}
    </div>
  );
};

export default ProductList;
