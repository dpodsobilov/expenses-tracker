import { useEffect } from "react";
import { IUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "./hook";
import { useLocalStorageUser } from "./useLocalStorageUser";
import { login } from "../features/authentication/authSlice";

function useAuth() {
  const { isAuth, currentUser } = useAppSelector((state) => state.auth);
  // const [user] = useLocalStorageUser(currentUser as IUser);

  const dispatch = useAppDispatch();

  // useEffect(
  //   function () {
  //     const user = localStorage.getItem("user");

  //     if (user) {
  //       dispatch(login(JSON.parse(user)));
  //     }
  //   },
  //   [dispatch]
  // );

  return {
    isAuth,
    // user,
  };
}

export default useAuth;
