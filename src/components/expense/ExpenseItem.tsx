import { FC } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { formatDate } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import { IExpense } from "../../interfaces/user-interfaces";
import useAuth from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { deleteExpense } from "../../store/slices/userSlice";

interface ExpenseItemProps {
  expense: IExpense;
}

export const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();

  function handleDeleteExpense() {
    if (userId) {
      dispatch(deleteExpense({ userId, expenseId: expense.id }));
    }
  }

  return (
    <ListItem>
      <ListItemText
        primary={expense.title}
        secondary={expense.date ? formatDate(expense.date) : ""}
      />
      <Typography>{formatAmount(expense.amount)} &#8381;</Typography>
      <ClearIcon sx={{ opacity: ".7" }} onClick={handleDeleteExpense} />
    </ListItem>
  );
};
