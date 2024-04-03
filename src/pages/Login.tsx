import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../store/slices/authSlice";
import useAuth from "../hooks/useAuth";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useInput } from "../hooks/form-hooks";
import { IUser } from "../interfaces/user-interfaces";

const Login: FC = () => {
  const email = useInput("", { isEmpty: true, minLength: 6, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 4, maxLength: 12 });

  const dispatch = useAppDispatch();
  const { isAuth, error } = useAuth();
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
      email: email.value,
      password: password.value,
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
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
          />
          {email.isDirty &&
            (email.emailError || email.minLengthError || email.isEmpty) && (
              <Typography variant="subtitle1" color="red">
                {email.error}
              </Typography>
            )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
          />
          {password.isDirty &&
            (password.minLengthError ||
              password.minLengthError ||
              password.isEmpty) && (
              <Typography variant="subtitle1" color="red">
                {password.error}
              </Typography>
            )}
          <Button
            disabled={!email.inputValid || !password.inputValid}
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            Войти &rarr;
          </Button>
          {error && (
            <Typography variant="subtitle1" color="red">
              {error}
            </Typography>
          )}
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

export default Login;
