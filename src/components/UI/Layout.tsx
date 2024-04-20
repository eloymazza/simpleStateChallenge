import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <section className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
