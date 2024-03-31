import { FC, useEffect, useState } from "react";

import styles from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { ExpenseItem } from "../../expense/ExpenseItem/ExpenseItem";
import useAuth from "../../../hooks/useAuth";
import { addExpense, clearExpenses, getExpenses, IExpense } from "../userSlice";
import useExpenses from "../../../hooks/useExpenses";
import { Box, List, Typography } from "@mui/material";

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
    <Box>
      <Typography variant="h4" component="p">
        Привет, {userName}!
      </Typography>
      <Box>
        <Box className={styles.expenses}>
          <Box>Фильтрация + справа добавление расхода</Box>
          {/* фильтры 
          1. период
          2. описание
          3. диапазон суммы
          */}
          {/* кнопка "добавить расход" */}

          <Box className={styles.content}>
            <List sx={{ width: 500 }}>
              {expansesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </List>
          </Box>
        </Box>
        <button onClick={addTestExpense}>ADD TEST EXPENSE</button>
        <button onClick={sortByDescSum}>by desc</button>
        <button onClick={sortByAscSum}>by asc</button>
      </Box>
    </Box>
  );
};
