import { useAppSelector } from "./redux-hooks";

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
