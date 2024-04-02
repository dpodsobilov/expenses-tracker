import { useAppSelector } from "./hook";

function useAuth() {
  const { isAuth, currentUser, error } = useAppSelector((state) => state.auth);
  const userId = currentUser?.id;
  const userName = currentUser?.name;
  return {
    isAuth,
    userId,
    userName,
    error,
  };
}

export default useAuth;
