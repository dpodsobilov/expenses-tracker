import { FC, useEffect, useState } from "react";
import { Box, Button, List, Typography } from "@mui/material";

import { getExpenses, IExpense } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/hook";
import useAuth from "../hooks/useAuth";

import { ExpenseItem } from "../components/expense/ExpenseItem";
import { NewExpense } from "../components/expense/NewExpense";
import { Filters } from "../components/profile/Filters";
import { Sorting } from "../components/profile/Sorting";
import useExpenses from "../hooks/useExpenses";

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();
  const [expansesList, setExpansesList] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="p">
        Привет, {userName}!
      </Typography>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Sorting
              onLoading={setIsLoading}
              expensesList={expansesList}
              onSortList={setExpansesList}
            />
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
              Добавить расход
            </Button>
          </Box>
          <Filters onFilterList={setExpansesList} />
        </Box>
        <Box>
          {isLoading && "Загрузка..."}
          {!isLoading && (
            <List sx={{ width: 500 }}>
              {expansesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </List>
          )}
        </Box>
      </Box>
      <NewExpense
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Box>
  );
};
