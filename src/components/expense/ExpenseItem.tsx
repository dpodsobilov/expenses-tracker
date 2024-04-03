import { FC } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import { IExpense } from "../../interfaces/user-interfaces";

interface ExpenseItemProps {
  expense: IExpense;
}

export const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <ListItem>
      <ListItemText
        primary={expense.title}
        secondary={expense.date ? formatDate(expense.date) : ""}
      />
      <Typography>{formatAmount(expense.amount)} &#8381;</Typography>
    </ListItem>
  );
};
