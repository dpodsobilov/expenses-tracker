import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hook";
import { register } from "../store/slices/authSlice";
import { IUser } from "../store/slices/userSlice";
import useAuth from "../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useInput } from "../hooks/formHooks";

export const Register: FC = () => {
  const name = useInput("", { isEmpty: true, minLength: 3 });
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

  function handleSubmitRegister(e: React.FormEvent) {
    e.preventDefault();
    const user: IUser = {
      email: email.value,
      password: password.value,
      name: name.value,
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
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
          />
          {name.isDirty && (name.minLengthError || name.isEmpty) && (
            <Typography variant="subtitle1" color="red">
              {name.error}
            </Typography>
          )}

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
            disabled={
              !name.inputValid || !email.inputValid || !password.inputValid
            }
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            Регистрация &rarr;
          </Button>
          {error && (
            <Typography variant="subtitle1" color="red">
              {error}
            </Typography>
          )}
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
