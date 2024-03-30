import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";

export const Home: FC = () => {
  return (
    <div className={styles.home}>
      <h1>Expenses Tracker - инструмент для учета расходов!</h1>
      <Link to="/login" className={styles.link}>
        Начать использование
      </Link>
    </div>
  );
};
