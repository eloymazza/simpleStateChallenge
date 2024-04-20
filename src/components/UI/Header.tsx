import styles from "./Header.module.css";
import CompanyLogo from "./CompanyLogo";

const Header = () => {
  return (
    <header className={styles.header}>
      <CompanyLogo />
    </header>
  );
};

export default Header;
