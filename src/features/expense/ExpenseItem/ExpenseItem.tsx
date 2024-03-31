import { FC } from "react";
import { IExpense } from "../../user/userSlice";

import styles from "./ExpenseItem.module.css";

interface ExpenseItemProps {
  expense: IExpense;
}

export const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li className={styles.expenseItem}>
      <p>{expense.title}</p>
      <p>{expense.date.toString()}</p>
      <p>{expense.amount} &#8381;</p>
    </li>
  );
};
