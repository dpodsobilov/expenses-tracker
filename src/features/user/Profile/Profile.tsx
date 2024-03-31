import { FC, useEffect, useState } from "react";

import styles from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { ExpenseItem } from "../../expense/ExpenseItem/ExpenseItem";
import { logout } from "../../authentication/authSlice";
import useAuth from "../../../hooks/useAuth";
import { addExpense, clearExpenses, getExpenses, IExpense } from "../userSlice";
import useExpenses from "../../../hooks/useExpenses";

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();
  const [expansesList, setExpansesList] = useState<IExpense[]>([]);

  useEffect(
    function () {
      if (userId) dispatch(getExpenses(userId));
    },
    [dispatch, userId]
  );

  useEffect(
    function () {
      if (expenses) setExpansesList(expenses);
    },
    [expenses]
  );

  function handleClickLogout() {
    dispatch(logout());
    dispatch(clearExpenses());
  }

  function addTestExpense() {
    const expense: IExpense = {
      id: "",
      date: new Date().toISOString(),
      amount: 300,
      title: "asdasd",
    };
    if (userId) dispatch(addExpense({ userId, expense }));
  }

  function sortByAscSum() {
    setExpansesList((expenses) =>
      expenses.slice().sort((a, b) => +a.amount - +b.amount)
    );
  }

  function sortByDescSum() {
    setExpansesList((expenses) =>
      expenses.slice().sort((a, b) => +b.amount - +a.amount)
    );
  }

  return (
    <div className={styles.profile}>
      <button onClick={handleClickLogout}>Выйти</button>
      <h2>Привет, {userName}!</h2>
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
              {expansesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </ul>
          </div>
        </div>
        {/* список расходов */}
        <button onClick={addTestExpense}>ADD TEST EXPENSE</button>
        <button onClick={sortByDescSum}>by desc</button>
        <button onClick={sortByAscSum}>by asc</button>
      </div>
    </div>
  );
};
