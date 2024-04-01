import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hook";
import { IUser } from "../features/user/userSlice";
import { login } from "../features/authentication/authSlice";
import useAuth from "../hooks/useAuth";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const Login: FC = () => {
  // если пользователь вошел, то редикректить в профиль
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuth) navigate("/profile");
    },
    [isAuth, navigate]
  );

  function handleSubmitLogin(e: React.FormEvent) {
    e.preventDefault();
    const user: IUser = {
      email,
      password,
      name: "",
      expenses: [],
      id: "",
    };
    dispatch(login({ ...user }));
  }

  return (
    <Container sx={{ width: 500 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" sx={{ mb: 2 }}>
            Войти &rarr;
          </Button>
          <Link to="/register">
            <Typography component="span" sx={{ opacity: ".5" }}>
              Нет аккаунта? Зарегистрироваться
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
