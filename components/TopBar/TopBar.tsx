import styles from "./TopBar.module.scss";
import checkoutCart from "@/services/cart/checkoutCart";
import useAuthentication from "@/hooks/useAuthentication";
import useCart from "@/hooks/useCart";
import useClientList from "@/hooks/useClientList";
import useProductList from "@/hooks/useProductList";
import { HomeIcon, UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import TopBarTotalPrice from "./TopBarTotalPrice";
import TopBarButton from "./TopBarButton";
import ClientSwitcher from "@/components/ClientSwitcher/ClientSwitcher";

/**
 * The top bar of the application that shows up on every page, containing the navigation buttons.
 * It also displays the input field to switch between clients and displays the one who is logged in.
 * If a client is logged in (depending on AuthenticationContext), display the user account menu item.
 * If the cart is not empty, display the cart menu item with the total price.
 */
const TopBar = () => {
  const { refreshClientList } = useClientList();
  const { refreshProductList } = useProductList();
  const { loggedInClient, setNewCreditsAmount } = useAuthentication();
  const { cart, resetCart } = useCart();

  const proceedToCheckout = () => {
    checkoutCart(cart)
      .then((loggedInClientNewCreditsAmount) => {
        resetCart();
        setNewCreditsAmount(loggedInClientNewCreditsAmount);
        refreshClientList();
        refreshProductList();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemscontainer}>
        <TopBarButton icon={<HomeIcon />} link="/" active />
        <ClientSwitcher />
        {loggedInClient && (
          <>
            <TopBarButton icon={<UserIcon />} link="/mon-compte" active={loggedInClient !== null} />
            {Object.keys(cart).length > 0 && (
              <TopBarButton icon={<ShoppingCartIcon />} clickCallback={proceedToCheckout} active>
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
