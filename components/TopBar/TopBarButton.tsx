import styles from "./TopBar.module.scss";
import Link from "next/link";

type TopBarButtonProps = {
  icon: any;
  clickCallback?: () => void;
  link?: string;
  active?: boolean;
  children?: React.ReactNode;
};

/**
 * An item in the top bar that can be a link or a button linked to a callback.
 */
const TopBarButton = ({ icon, clickCallback, link, active, children }: TopBarButtonProps) => {
  if (!active) return null;

  if (link)
    return (
      <Link className={styles.item} href={link} onClick={clickCallback}>
        {icon}
        {children}
      </Link>
    );

  return (
    <div className={styles.item} onClick={clickCallback}>
      {icon}
      {children}
    </div>
  );
};

export default TopBarButton;
