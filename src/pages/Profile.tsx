import { FC, useCallback, useEffect, useState } from "react";
import { Box, Button, List, Typography } from "@mui/material";

import { getExpenses } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
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

const Profile: FC = () => {
  console.log("profile render");

  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();

  const [expensesList, setExpensesList] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: new Date(),
  });
  const [title, setTitle] = useState<string>("");
  const [amountRange, setAmountRange] = useState<IAmountRange>({
    minAmount: 0,
    maxAmount: null,
  });

  const [sortType, setSortType] = useState<SortType>("byDefault");

  const compareByDates = useCallback(
    (a: IExpense, b: IExpense) => {
      switch (sortType) {
        case "byDefault":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "byAsc":
          return a.amount - b.amount;
        case "byDesc":
          return b.amount - a.amount;
      }
    },
    [sortType]
  );

  useEffect(
    function () {
      if (userId) {
        setIsLoading(true);
        dispatch(getExpenses(userId)).then(() => setIsLoading(false));
      }
    },
    [dispatch, userId]
  );

  useEffect(
    function () {
      if (expenses) {
        setExpensesList(
          expenses
            .filter((exp: IExpense) => {
              const dateExp = new Date(exp.date);
              const isWithinDateRange =
                (!dateRange.startDate ||
                  dateExp.getTime() >= dateRange.startDate.getTime()) &&
                (!dateRange.endDate ||
                  dateExp.getTime() <= dateRange.endDate.getTime());

              const isTitleMatch =
                title !== ""
                  ? exp.title.toLowerCase().includes(title.toLowerCase())
                  : true;

              const isWithinAmountRange =
                (!amountRange.minAmount ||
                  exp.amount >= amountRange.minAmount) &&
                (!amountRange.maxAmount || exp.amount <= amountRange.maxAmount);

              return isWithinDateRange && isTitleMatch && isWithinAmountRange;
            })
            .sort(compareByDates)
        );
      }
    },
    [
      amountRange.maxAmount,
      amountRange.minAmount,
      dateRange.endDate,
      dateRange.startDate,
      expenses,
      compareByDates,
      title,
    ]
  );

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setDateRange((prev) => {
      return {
        ...prev,
        endDate: new Date(),
      };
    });
  }

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
            <Sorting sortType={sortType} onSetSortType={setSortType} />
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
              {expensesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </List>
          )}
        </Box>
      </Box>
      <NewExpense isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};

export default Profile;
