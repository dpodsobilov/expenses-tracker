import { FC } from "react";
import styles from "./ExpenseItem.module.css";

export const ExpenseItem: FC = () => {
  return (
    <li className={styles.expenseItem}>
      <p>Продукты</p>
      <p>250.00 &#8381;</p>
    </li>
  );
};
