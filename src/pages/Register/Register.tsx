import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useAppDispatch } from "../../hooks/hook";
import { register } from "../../features/authentication/authSlice";
import { IUser } from "../../features/user/userSlice";
import useAuth from "../../hooks/useAuth";

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
    <div className={styles.box}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmitRegister} className={styles.form}>
        <label htmlFor="name">Имя:</label>
        <input
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button>Регистрация &rarr;</button>
        <Link to="/login" className={styles.link}>
          <span>Есть аккаунт? Войти</span>
        </Link>
      </form>
    </div>
  );
};
