import styles from "./TopBar.module.scss";
import useCart from "@/hooks/useCart";

const TopBarTotalPrice = () => {
  const { price } = useCart();

  return <div className={`${styles.totalprice} ${price > 0 ? styles.active : ""}`}>{price} €</div>;
};

export default TopBarTotalPrice;
