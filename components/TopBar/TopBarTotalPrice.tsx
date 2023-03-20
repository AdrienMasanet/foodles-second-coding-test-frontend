import styles from "./TopBar.module.scss";
import { useContext, useState, useEffect } from "react";
import { CartPriceContext } from "@/context/CartContext";

const TopBarTotalPrice = () => {
  const price = useContext(CartPriceContext);

  return <div className={`${styles.totalprice} ${price > 0 ? styles.active : ""}`}>{price} €</div>;
};

export default TopBarTotalPrice;
