import { AppBar, Container, Typography } from "@mui/material";
import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { clearExpenses } from "../store/slices/userSlice";
import { logout } from "../store/slices/authSlice";
import { LinkStyled } from "./LinkStyled";

export const Header: FC = () => {
  const location = useLocation();
  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(clearExpenses());
    dispatch(logout());
  }
  return (
    <AppBar position="relative" sx={{ bgcolor: "#333" }}>
      <Container sx={{ display: "flex" }}>
        <Typography variant="h3" component="h1" sx={{ my: 1, flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Expenses Tracker
          </Link>
        </Typography>

        {isAuth && location.pathname.startsWith("/profile") && (
          <LinkStyled onClick={handleLogout} to="/">
            Выйти
          </LinkStyled>
        )}
        {(!isAuth || (isAuth && !location.pathname.startsWith("/profile"))) && (
          <LinkStyled to={isAuth ? "/profile" : "/login"}>Войти</LinkStyled>
        )}
      </Container>
    </AppBar>
  );
};
