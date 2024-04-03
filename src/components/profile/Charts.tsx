import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js/auto";
import { FC } from "react";
import { IExpense } from "../../interfaces/user-interfaces";
import { Box, Typography } from "@mui/material";
import { formatAmount } from "../../utils/formatAmount";

interface ChartsProps {
  expensesList: IExpense[];
}

export const Charts: FC<ChartsProps> = ({ expensesList }) => {
  Chart.register(ArcElement);

  const data = {
    labels: expensesList.map((exp) => exp.title),
    datasets: [
      {
        label: "Сумма",
        data: expensesList.map((exp) => exp.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const sum = expensesList.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Doughnut data={data} />
      <Typography>Сумма расходов: {formatAmount(sum)} &#8381;</Typography>
    </Box>
  );
};
