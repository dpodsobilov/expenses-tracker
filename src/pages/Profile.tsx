import { FC, useEffect, useState } from "react";
import { Box, Button, List, Typography } from "@mui/material";

import { getExpenses } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/hook";
import useAuth from "../hooks/useAuth";
import useExpenses from "../hooks/useExpenses";

import { ExpenseItem } from "../components/expense/ExpenseItem";
import { NewExpense } from "../components/expense/NewExpense";
import { Filters } from "../components/profile/Filters";
import { Sorting } from "../components/profile/Sorting";
import { IExpense } from "../interfaces/user-interfaces";
import {
  IAmountRange,
  IDateRange,
  SortType,
} from "../interfaces/profile-interfaces";

export const Profile: FC = () => {
  console.log("profile render");

  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();

  const [expansesList, setExpansesList] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const maxAmount = expenses.reduce((max, cur) =>
    max.amount > cur.amount ? max : cur
  ).amount;
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: new Date(),
  });
  const [title, setTitle] = useState<string>("");
  const [amountRange, setAmountRange] = useState<IAmountRange>({
    minAmount: 0,
    maxAmount: maxAmount,
  });
  const [sortType, setSortType] = useState<SortType>("byDefault");

  function sortByDates(a: IExpense, b: IExpense) {
    switch (sortType) {
      case "byDefault":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "byAsc":
        return a.amount - b.amount;
      case "byDesc":
        return b.amount - a.amount;
    }
  }

  const displayedExpenses = expansesList
    .filter((exp) => {
      const dateExp = new Date(exp.date);
      if (dateRange.startDate)
        return dateExp.getTime() >= dateRange.startDate.getTime();
      else return exp;
    })
    .filter((exp) => {
      const dateExp = new Date(exp.date);
      if (dateRange.endDate)
        return dateExp.getTime() <= dateRange.endDate.getTime();
      else return exp;
    })
    .filter((exp) => {
      if (title !== "") return exp.title.toLowerCase().includes(title);
      else return exp;
    })
    .filter((exp) => {
      if (amountRange.minAmount) return exp.amount >= amountRange.minAmount;
      else return exp;
    })
    .filter((exp) => {
      if (amountRange.maxAmount) return exp.amount <= amountRange.maxAmount;
      else return exp;
    })
    .sort(sortByDates);

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
            {/* <Sorting
              onLoading={setIsLoading}
              expensesList={expansesList}
              onSortList={setExpansesList}
            /> */}
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
              Добавить расход
            </Button>
          </Box>
          <Filters
            dateRange={dateRange}
            onSetDateRange={setDateRange}
            title={title}
            onSetTitle={setTitle}
            amountRange={amountRange}
            onSetAmountRange={setAmountRange}
          />
        </Box>
        <Box>
          {isLoading && "Загрузка..."}
          {!isLoading && (
            <List sx={{ width: 500 }}>
              {displayedExpenses.map((expense) => (
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
