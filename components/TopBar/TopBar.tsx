import ClientSwitcher from "@/components/ClientSwitcher/ClientSwitcher";
import TopBarButton from "./TopBarButton";
import TopBarTotalPrice from "./TopBarTotalPrice";
import styles from "./TopBar.module.scss";
import { useContext } from "react";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import { CartContext } from "@/context/CartContext";
import { HomeIcon, UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

/**
 * The top bar of the application that shows up on every page, containing the navigation buttons.
 * It also displays the input field to switch between clients and displays the one who is logged in.
 * If a client is logged in (depending on AuthenticationContext), display the user account menu item.
 * If the cart is not empty, display the cart menu item with the total price.
 */
const TopBar = () => {
  const loggedInClient = useContext(AuthenticationContext);
  const cart = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.itemscontainer}>
        <TopBarButton icon={<HomeIcon />} link="/" active />
        <ClientSwitcher />
        {loggedInClient && (
          <>
            <TopBarButton icon={<UserIcon />} link="/mon-compte" active={loggedInClient !== null} />
            {cart.length > 0 && (
              <TopBarButton icon={<ShoppingCartIcon />} clickCallback={() => console.log("TODO : ORDER")} active>
                <TopBarTotalPrice />
              </TopBarButton>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
