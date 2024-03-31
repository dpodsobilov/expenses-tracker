import React, { FC } from "react";

export const NewExpense: FC = () => {
  return (
    <form>
      <label>Введите описание:</label>
      <input />

      <label>Выберите дату:</label>
      <input />

      <label>Введите сумму:</label>
      <input />
    </form>
  );
};
