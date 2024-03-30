import { FC, useEffect } from "react";
import styles from "./Profile.module.css";
import { ExpenseItem } from "../../expense/ExpenseItem/ExpenseItem";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Profile: FC = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigate("/login");
    },
    [isAuth, navigate]
  );

  return (
    <div className={styles.profile}>
      <h2>Привет, X!</h2>
      <div>
        <div className={styles.expenses}>
          {/* фильтры 
          1. период
          2. описание
          3. диапазон суммы
          */}
          {/* кнопка "добавить расход" */}

          <div className={styles.filtersBox}></div>
          <div className={styles.content}>
            <ul>
              <ExpenseItem />
              <ExpenseItem />
              <ExpenseItem />
            </ul>
          </div>
        </div>
        {/* список расходов */}
      </div>
    </div>
  );
};
