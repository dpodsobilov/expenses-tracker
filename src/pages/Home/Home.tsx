import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import useAuth from "../../hooks/useAuth";

export const Home: FC = () => {
  const { isAuth } = useAuth();

  return (
    <Box mt={4} sx={{ textAlign: "center" }}>
      <Typography variant="h2">
        Expenses Tracker - инструмент для учета ваших расходов.
      </Typography>
      <Link to={isAuth ? "/profile" : "/login"}>
        <Typography sx={{ fontSize: 25, mt: 2 }}>
          Начать использование
        </Typography>
      </Link>
    </Box>
  );
};
