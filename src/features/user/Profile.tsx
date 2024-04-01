import { FC, useEffect, useState } from "react";

import { useAppDispatch } from "../../hooks/hook";
import { ExpenseItem } from "../expense/ExpenseItem";
import useAuth from "../../hooks/useAuth";
import { getExpenses, IExpense } from "./userSlice";
import useExpenses from "../../hooks/useExpenses";
import { Box, Button, List, Typography } from "@mui/material";
import { NewExpense } from "../expense/NewExpense.tsx/NewExpense";

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();
  const [expansesList, setExpansesList] = useState<IExpense[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(
    function () {
      if (userId) dispatch(getExpenses(userId));
    },
    [dispatch, userId]
  );

  useEffect(
    function () {
      if (expenses) {
        const sortedExpenses = expenses.slice().sort((a, b) => {
          const dat1 = new Date(a.date).getTime();
          const dat2 = new Date(b.date).getTime();

          return dat2 - dat1;
        });
        setExpansesList(sortedExpenses);
      }
    },
    [expenses]
  );

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

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <Box>
      <Typography variant="h4" component="p">
        Привет, {userName}!
      </Typography>
      <Box>
        <Box>
          <Box>Фильтрация + справа добавление расхода</Box>
          {/* фильтры 
          1. период
          2. описание
          3. диапазон суммы
          */}
          {/* кнопка "добавить расход" */}
          <Button onClick={() => setIsDialogOpen(true)}>Добавить расход</Button>
          <Box>
            <List sx={{ width: 500 }}>
              {expansesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </List>
          </Box>
        </Box>
        <button onClick={sortByDescSum}>by desc</button>
        <button onClick={sortByAscSum}>by asc</button>
      </Box>
      <NewExpense isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};
