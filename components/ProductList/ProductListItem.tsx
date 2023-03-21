import styles from "./ProductList.module.scss";
import Product from "@/interfaces/Product";
import { useState, useEffect } from "react";
import useCart from "@/hooks/useCart";
import { MinusCircleIcon, PlusCircleIcon, InboxArrowDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ProductListItemProps = {
  product: Product;
};

/**
 * Displays an buyable item while displaying its name, price and image.
 */
const ProductListItem = ({ product }: ProductListItemProps) => {
  const { cart, addProduct, subtractProduct } = useCart();
  const [quantity, setQuantity] = useState(0);

  // On cart context update, set the quantity to the actual quantity of the product in the cart
  useEffect(() => {
    const cartProduct = cart[product.id];

    if (cartProduct) {
      setQuantity(cartProduct);
    } else {
      setQuantity(0);
    }
  }, [cart, product]);

  return (
    <div className={styles.itemcontainer} key={product.id}>
      <div className={styles.thumbnail}>
        <div className={`${styles.overlay} ${quantity > 0 ? styles.active : ""}`}>{quantity > 0 ? quantity : "\u00A0"}</div>
        <Image src={process.env.NEXT_PUBLIC_API_URL + product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
      </div>
      <p className={styles.name}>{product.name}</p>
      <div className={styles.infossandactionscontainer}>
        <div className={styles.infos}>
          <p>{product.price}&nbsp;€</p>
          <p>{product.stock} en stock</p>
        </div>
        <div className={styles.buttons}>
          {quantity > 0 && (
            <div onClick={() => subtractProduct(product)}>
              <MinusCircleIcon />
            </div>
          )}
          <div className={`${quantity >= product.stock ? styles.disabled : ""}`} onClick={() => quantity < product.stock && addProduct(product)}>
            {quantity > 0 ? <PlusCircleIcon /> : <InboxArrowDownIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
