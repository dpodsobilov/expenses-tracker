import { FC } from "react";
import { IExpense } from "../../user/userSlice";

import { ListItem, ListItemText, Typography } from "@mui/material";

interface ExpenseItemProps {
  expense: IExpense;
}

export const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  return (
    // secondaryAction={<ListItemText primary={expense.amount}}/>
    <ListItem>
      {/* <p>{expense.title}</p>
      <p>{expense.date.toString()}</p>
      <p>{expense.amount} &#8381;</p> */}
      <ListItemText primary={expense.title} secondary={expense.date} />
      <Typography>{expense.amount} &#8381;</Typography>
    </ListItem>
  );
};
