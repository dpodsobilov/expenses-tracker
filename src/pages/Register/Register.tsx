import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useAppDispatch } from "../../hooks/hook";
import { register } from "../../features/authentication/authSlice";
import { IUser } from "../../features/user/userSlice";
import useAuth from "../../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const Register: FC = () => {
  // если пользователь вошел, то редикректить в профиль
  const [name, setName] = useState<string>("");
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

  function handleSubmitRegister(e: React.FormEvent) {
    e.preventDefault();
    const user: IUser = {
      email,
      password,
      name,
      expenses: [],
      id: "",
    };
    dispatch(register({ ...user }));
  }

  return (
    <Container sx={{ width: 500 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitRegister}
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
            id="name"
            label="Имя"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Регистрация &rarr;
          </Button>
          <Link to="/login">
            <Typography component="span" sx={{ opacity: ".5" }}>
              Есть аккаунт? Войти
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
