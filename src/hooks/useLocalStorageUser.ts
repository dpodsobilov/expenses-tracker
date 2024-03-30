import { useState, useEffect } from "react";
import { IUser } from "../features/user/userSlice";

export function useLocalStorageUser(initialState: IUser) {
  console.log(initialState);

  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("user");
    if (storedValue) {
      const storedUser: IUser = JSON.parse(storedValue);
      if (
        storedUser.email !== initialState.email ||
        storedUser.password !== initialState.password
      ) {
        localStorage.removeItem("user");
      } else {
        return;
      }
    }
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      if (value) localStorage.setItem("user", JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
