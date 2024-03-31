import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import useAuth from "../../hooks/useAuth";

export const Home: FC = () => {
  const { isAuth } = useAuth();

  return (
    <div className={styles.home}>
      <h1>Expenses Tracker - инструмент для учета расходов!</h1>
      <Link to={isAuth ? "/profile" : "/login"} className={styles.link}>
        Начать использование
      </Link>
    </div>
  );
};
