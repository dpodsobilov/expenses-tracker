import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <main className={styles.app}>
      <Outlet />
    </main>
  );
}
