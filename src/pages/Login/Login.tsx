import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAppDispatch } from "../../hooks/hook";
import { IUser } from "../../features/user/userSlice";
import { login } from "../../features/authentication/authSlice";
import useAuth from "../../hooks/useAuth";

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
  // dispatch(getUsers());

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
    <div className={styles.box}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmitLogin} className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Войти &rarr;</button>
        <Link to="/register" className={styles.link}>
          <span>Нет аккаунта? Зарегистрироваться</span>
        </Link>
      </form>
    </div>
  );
};
